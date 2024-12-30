document.addEventListener('DOMContentLoaded', function () {
    const restaurantSelect = document.getElementById('restaurant');
    const restaurantInfo = document.querySelectorAll('.restaurant-info');
    const form = document.getElementById('survey-form');
  
    // 顯示選擇的餐廳介紹
    function showRestaurantInfo() {
      // 隱藏所有餐廳介紹
      restaurantInfo.forEach(info => {
        info.classList.remove('active');
      });
  
      // 根據選擇顯示對應的餐廳介紹
      const selectedRestaurant = restaurantSelect.value;
      const selectedInfo = document.getElementById('restaurant-info-' + selectedRestaurant);
      if (selectedInfo) {
        selectedInfo.classList.add('active');
      }
    }
  
    // 當餐廳選擇改變時，更新介紹
    restaurantSelect.addEventListener('change', showRestaurantInfo);
  
    // 頁面載入後初始顯示餐廳介紹
    showRestaurantInfo();
  
    // 提交表單時發送資料到後端 API
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // 防止表單的默認提交行為
  
      // 取得表單資料
      const name = document.getElementById('name').value;
      const date = document.getElementById('date').value;
      const restaurant = document.getElementById('restaurant').value;
  
      // 您的後端 API URL（需要替換為實際的後端 URL）
      const apiUrl = 'postgresql://test_zij7_user:cXCq0Km71u7ODlDgwYH94sXP0mVrMnJz@dpg-ctp93gij1k6c739h5nbg-a.oregon-postgres.render.com/test_zij7';
  
      // 顯示提交中提示
      const submitButton = form.querySelector('.submit-btn');
      submitButton.disabled = true;
      submitButton.textContent = '提交中...';
  
      // 使用 fetch 提交表單資料
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, date, restaurant }),
      })
      .then(response => response.json())
      .then(data => {
        alert('表單提交成功！');
        // 在這裡可以執行一些成功處理，例如清空表單或顯示成功訊息
        form.reset();
        showRestaurantInfo();  // 恢復餐廳介紹的顯示狀態
      })
      .catch(error => {
        console.error('錯誤:', error);
        alert('提交失敗，請稍後再試。');
      })
      .finally(() => {
        // 恢復按鈕狀態
        submitButton.disabled = false;
        submitButton.textContent = '提交調查';
      });
    });
  });
  