// Проверяем, доступен ли объект initDataUnsafe
if (window.Telegram.WebApp.initDataUnsafe) {



    // username на сайте
    const userName = window.Telegram.WebApp.initDataUnsafe.user.first_name;





    document.getElementById('nickname').textContent = userName; 




    // Получаем аватарку
    const userAvatar = window.Telegram.WebApp.initDataUnsafe.user.photo_url;



    document.getElementById('telegram_icon').src = userAvatar; 



    // Получаем Telegram ID из initDataUnsafe
    const tgId = window.Telegram.WebApp.initDataUnsafe.user.id;


    // Отправляем ID на сервер
    fetch('https://66c5-89-22-177-227.ngrok-free.app/receive_tg_id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: tgId })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Сетевая ошибка при обращении к серверу');
      }
      return response.json();
    })
    .then(userData => {
      // Отображаем данные пользователя на сайте
      document.getElementById('amountdep').textContent = userData.deposit
      document.getElementById('profit-amount').textContent = userData.windeposit
      document.getElementById('amount').textContent = userData.trades;
      document.getElementById('amountdepweek').textContent = userData.deposit//доделать потом
      document.getElementById('amountweek').textContent = userData.trades;//доделать потом
    })
    .catch((error) => {
      console.error('Ошибка:', error);
      document.getElementById('user-data').textContent = 'Ошибка при загрузке данных пользователя: ' + error.message;
    });

  } else {
    document.getElementById('tg-id').textContent = 'Ошибка: initDataUnsafe не доступен.';
    document.getElementById('user-data').textContent = '';
  }