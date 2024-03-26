window.onload = () => {

  let tipPercent = 0;
  const billTotalInp = document.getElementById("billTotalInp");
  const tipPerInp = document.getElementById("tipPerInp");
  const tipAmountInp = document.getElementById("tipAmountInp");
  const billResInp = document.getElementById("billResInp");

  const progressBar = document.getElementById('progress-bar');
  const progress = document.getElementById('progress');

  let isDragging = false;

  progressBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateProgress(e.pageX);
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      updateProgress(e.pageX);
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  progressBar.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateProgress(e.touches[0].clientX);
  });
  
  document.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (isDragging) {
      e.preventDefault();
      updateProgress(e.touches[0].clientX);
    }
  }, { passive: false });
  
  document.addEventListener('touchend', () => {
    isDragging = false;
  });

  function updateProgress(x) {
    const progressBarRect = progressBar.getBoundingClientRect();
    const progressWidth = x - progressBarRect.left;
    const progressBarWidth = progressBar.offsetWidth;
    const percentage = (progressWidth / progressBarWidth) * 100;

    if (percentage >= 0 && percentage <= 100) {
      progress.style.width = percentage + '%';
      tipPercent = Math.round(percentage);
      console.log('tipPercent', tipPercent);
      // const tipPerDom = document.getElementById("tipPer");
      // tipPerDom.innerHTML = `${tipPercent}%`;
      tipPerInp.value = `${tipPercent}%`;
      
      calcInp();
    }
  }

  const calcInp = () => {
    const billTotalValue = billTotalInp.value;
    if (billTotalValue && !isNaN(+billTotalValue)) {
      const tipAmountValue = (billTotalValue * tipPercent * 0.01).toFixed(2);
      tipAmountInp.value = tipAmountValue;
      billResInp.value =  (+ tipAmountValue + parseFloat(billTotalValue)).toFixed(2);
    } else {
      tipAmountInp.value = "";
      billResInp.value = "";
    }
  }

  billTotalInp.addEventListener("input", () => {
    const billTotalValue = billTotalInp.value;
    if (!billTotalValue) {
      clearTotal();
      return;
    };
    const totalTipText = document.getElementById("totalTipText");
    const totalTipDecimal = document.getElementById("totalTipDecimal");

    totalTipDecimal.style.display = "none";

    if (isNaN(+billTotalValue)) {
      totalTipText.style.display = "block";
    } else {
      totalTipText.style.display = "none";
      let decimalPart = billTotalValue.split('.')[1];
        
        if (decimalPart && decimalPart.length > 2) {
          totalTipDecimal.style.display = "block";
          clearTotal();
          return true;
        }
    }
    calcInp();
  })

  const clearTotal = () => {
    tipAmountInp.value = "";
      billResInp.value =  "";
  }

}


