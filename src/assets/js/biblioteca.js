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
      element.style.display = 'flex'
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

// biome-ignore lint/complexity/noForEach: <explanation>
document.querySelectorAll('.details-button').forEach(button => {
  button.addEventListener('click', event => {
    const card = event.target.closest('.car-card')
    const carTitle = card.querySelector('.car-title').textContent
    const carSubtitle = card.querySelector('.car-subtitle').textContent
    const carImage = card.querySelector('.car-image').src

    document.getElementById('modalCarTitle').textContent = carTitle
    document.getElementById('modalCarSubtitle').textContent = carSubtitle
    document.getElementById('modalCarImage').src = carImage
    document.getElementById('modalPricePerKm').textContent = card.dataset.price
    document.getElementById('highwayFuelConsumption').textContent =
      card.dataset.consumoEstrada
    document.getElementById('cityFuelConsumption').textContent =
      card.dataset.consumoCidade

    const modal = new bootstrap.Modal(
      document.getElementById('carDetailsModal')
    )
    modal.show()
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('.modal')

  // biome-ignore lint/complexity/noForEach: <explanation>
  modals.forEach(modal => {
    modal.addEventListener('show.bs.modal', () => {
      document.querySelector('.navbar-nav').classList.add('modal-open-header')
      document
        .getElementById('footer-container')
        .classList.add('modal-open-footer')
    })

    modal.addEventListener('hidden.bs.modal', () => {
      document
        .querySelector('.navbar-nav')
        .classList.remove('modal-open-header')
      document
        .getElementById('footer-container')
        .classList.remove('modal-open-footer')
    })
  })
})
