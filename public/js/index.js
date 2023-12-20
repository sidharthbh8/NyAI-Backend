console.log('Client side javascript file is loaded!');

let service
function initialize() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        fetch('/lawyersNearby', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coordinates: {
              latitude,
              longitude,
            }
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Server response:', data);
          })
          .catch(error => {
            console.error('Error sending data to server:', error);
          });

      },
      function (error) {
        console.error('Error getting user location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

document.getElementById('getLawyersButton').addEventListener('click', function () {

  fetch('/lawyersNearby')
    .then(response => response.json())
    .then(data => {
      
      let lawyersList = document.getElementById('lawyersList');
      lawyersList.innerHTML = '';
      for (let lawyer of data) {
        // A container for each lawyer
        let lawyerContainer = document.createElement('div');

        let pTitle = document.createElement('p');
        pTitle.textContent = `Name ${lawyer.title}`;
        lawyerContainer.appendChild(pTitle);

        let pAddress = document.createElement('p');
        pAddress.textContent = `Address: ${lawyer.address}`;
        lawyerContainer.appendChild(pAddress);

        let pPhone = document.createElement('p');
        pPhone.textContent = `Phone: ${lawyer.phone}`;
        lawyerContainer.appendChild(pPhone);

        let pRating = document.createElement('p');
        pRating.textContent = `Rating: ${lawyer.rating}`;
        lawyerContainer.appendChild(pRating);

        lawyersList.appendChild(lawyerContainer);
      }
    });
});