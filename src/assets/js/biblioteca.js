const button = document.querySelector('.buttonSearchBar')
const input = document.getElementById('searchQuery')
const selectTypeEngine = document.getElementById('typeEngine')
const selectCo2Emission = document.getElementById('co2Emission')
const carCardRow = document.getElementById('carCardRow')
const explainH1 = document.createElement('h1')
explainH1.innerText = 'Carro não encontrado, tente outra hora!'

function searchFilter() {
  const carCards = document.querySelectorAll('.car-card-container')
  let carFound = false

  const existingMessage = document.querySelector('.no-car-message')
  if (existingMessage) {
    existingMessage.remove()
  }

  // biome-ignore lint/complexity/noForEach: <explanation>
  carCards.forEach(element => {
    const inputValue = input.value.toLowerCase()
    const selectTypeEngineValue = selectTypeEngine.value
    const selectCo2EmissionValue = selectCo2Emission.value

    const carName = element
      .querySelector('.car-title')
      .textContent.toLowerCase()
    const carEngineTitle = element
      .querySelector('.car-subtitle')
      .textContent.split('•')
    const motorName = carEngineTitle[1].trim()
    const co2Emission = element.querySelector('.info-value')
    const co2EmissionDatasetValue = co2Emission.dataset.co2Value

    const findNameCar = carName.includes(inputValue)
    const findTypeEngine = selectTypeEngineValue
      ? motorName.includes(selectTypeEngineValue)
      : true

    const findCo2Emission = selectCo2EmissionValue
      ? co2EmissionDatasetValue.includes(selectCo2EmissionValue)
      : true

    if (findNameCar && findTypeEngine && findCo2Emission) {
      element.style.display = 'block'
      carFound = true
    } else {
      element.style.display = 'none'
    }
  })
  if (!carFound) {
    explainH1.classList.add('no-car-message')
    carCardRow.append(explainH1)
  }
}

button.addEventListener('click', searchFilter)
