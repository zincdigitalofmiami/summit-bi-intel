var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')
var themeToggleBtn = document.getElementById('theme-toggle')

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (
  localStorage.getItem('color-theme') === 'dark' ||
  (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark')
  themeToggleBtn.checked = false
} else {
  document.documentElement.classList.remove('dark')
  themeToggleBtn.checked = true
}

;[themeToggleDarkIcon, themeToggleLightIcon, themeToggleBtn].forEach((item) => {
  item.addEventListener('click', function (e) {
    //   e.preventDefault()
    e.stopPropagation()
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
        themeToggleBtn.checked = false

        return
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
        themeToggleBtn.checked = true

        return
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
        return
      } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
        return
      }
    }
  })
})

let sideBarBtn = document.getElementById('sidebar-btn')
let sideBarExpandBtn = document.getElementById('sidebar-expand')
let layout = document.getElementById('layout')

sideBarBtn.addEventListener('click', function (e) {
  layout.classList.toggle('grid-cols-[257px,1fr]')
  layout.classList.toggle('minimize')
  sideBarBtn.classList.toggle('reverse')
})

// Collapse side bar when in mobile
function collapseSideBar() {
  if (window.innerWidth < 650 && !sideBarBtn.classList.contains('reverse')) {
    sideBarBtn.click()
  }
}

window.addEventListener('resize', collapseSideBar)
window.addEventListener('load', collapseSideBar)

function toggleFullScreen() {
  var doc = window.document
  var docEl = doc.documentElement

  var requestFullScreen =
    docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
  var cancelFullScreen =
    doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl)
  } else {
    cancelFullScreen.call(doc)
  }
}

sideBarExpandBtn.addEventListener('click', toggleFullScreen)

//Dropdown toggle
const dropdownContent = document.querySelectorAll('.dropdown-label')
function checkAndCloseDropDown(e) {
  let targetEl = e.currentTarget
  if (targetEl && targetEl.matches(':focus')) {
    setTimeout(function () {
      targetEl.blur()
    }, 0)
  }
}
if (dropdownContent) {
  dropdownContent.forEach((element) => {
    element.addEventListener('mousedown', (e) => checkAndCloseDropDown(e))
  })
}

// PERFORMANCE CHART
const Utils = ChartUtils.init()

const DATA_COUNT = 12
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 }

const ctx = document.getElementById('performanceChart')
const labels = Utils.months({ count: 12 })
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Completed',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: '#FC8D9D',
      fill: true,
    },
    {
      label: 'Pending',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: '#F3BCFD',
      fill: true,
    },
    {
      label: 'Unpaid',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: '#80B7FB',
      fill: true,
    },
    {
      label: 'Delivered',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: '#B9A2FB',
      fill: true,
    },
  ],
}

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
      },
      legend: {
        align: 'start',
        labels: {
          boxWidth: 16,
          boxHeight: 16,
          usePointStyle: true,
          pointStyle: 'rectRounded',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: false,
        },
      },
      y: {
        stacked: false,
        display: false,
        title: {
          display: false,
          // text: 'Value',
        },
      },
    },
  },
}
if (ctx) {
  const performanceChart = new Chart(ctx, config)
}

// REVENUE CHART

const ctxRevenue = document.getElementById('revenueChart')
const dataRevenue = {
  labels: labels,
  datasets: [
    {
      label: 'Direct',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: '#5415F1',
      fill: true,
    },
    {
      label: 'Social',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: '#DD50D6',
      fill: true,
    },
  ],
}

const configRevenue = {
  type: 'line',
  data: dataRevenue,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
      },
      legend: {
        align: 'start',
        labels: {
          boxWidth: 16,
          boxHeight: 16,
          usePointStyle: true,
          pointStyle: 'rectRounded',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        display: false,
        title: {
          display: false,
        },
      },
      y: {
        stacked: false,
        display: false,
        title: {
          display: false,
          // text: 'Value',
        },
      },
    },
  },
}
if (ctxRevenue) {
  const revenueChart = new Chart(ctxRevenue, configRevenue)
}

// Visit Chart
const ctxVisit = document.getElementById('visitChart')
const dataVisit = {
  labels: ['Direct', 'Social', 'Email', 'Other'],
  datasets: [
    {
      label: '',
      data: [300, 50, 100, 150],
      backgroundColor: ['#FC8D9D', '#F3BCFD', '#80B7FB', '#B9A2FB'],
      hoverOffset: 4,
    },
  ],
}
const configVisit = {
  type: 'doughnut',
  data: dataVisit,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
      },
      legend: {
        align: 'start',
        labels: {
          boxWidth: 16,
          boxHeight: 16,
          usePointStyle: true,
          pointStyle: 'rectRounded',
        },
      },
    },
  },
}
if (ctxVisit) {
  const visitChart = new Chart(ctxVisit, configVisit)
}

// Department Chart
const ctxDepartment = document.getElementById('departmentChart')
const dataDepartment = {
  labels: ['Grocery', 'Laptop', 'Gaming', 'Others'],
  datasets: [
    {
      label: '',
      data: [100, 100, 100, 100],
      backgroundColor: ['#2775FF', '#50D1B2', '#7364DB', '#E23738'],
      hoverOffset: 4,
      borderWidth: 0,
      borderRadius: 14,
    },
  ],
}
const configDepartment = {
  type: 'doughnut',
  data: dataDepartment,
  options: {
    cutout: 75,
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
      },
      legend: {
        position: 'right',
        align: 'end',
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
  },
}
if (ctxDepartment) {
  const departmentChart = new Chart(ctxDepartment, configDepartment)
}

const ctxSeller = document.getElementById('sellerChart')
const dataSeller = {
  labels: labels,
  datasets: [
    {
      label: 'Order',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: '#50D1B2',
      backgroundColor: '#50D1B2',
    },
    {
      label: 'Earnings',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: '#EC8C56',
      backgroundColor: '#EC8C56',
    },
    {
      label: 'Refunds',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: '#E23738',
      backgroundColor: '#E23738',
    },
  ],
}

const configSeller = {
  type: 'line',
  data: dataSeller,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: 'bottom',
        align: 'center',
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
    elements: {
      line: {
        tension: 0.3,
      },
    },
  },
}
if (ctxSeller) {
  const sellerChart = new Chart(ctxSeller, configSeller)
}

// FINANCE INCOME CHART
const ctxIncome = document.getElementById('incomeChart')
const dataIncome = {
  labels: labels,
  datasets: [
    {
      label: 'Income',
      data: Utils.numbers({ count: 10, min: 0, max: 40 }),
      borderColor: '#50D1B2',
      backgroundColor: '#50D1B2',
      pointRadius: 0,
    },
  ],
}

const configIncome = {
  type: 'line',
  data: dataIncome,
  options: {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
    },
  },
}
if (ctxIncome) {
  const IncomeChart = new Chart(ctxIncome, configIncome)
}

const ctxExpences = document.getElementById('expencesChart')
const dataExpences = {
  labels: labels,
  datasets: [
    {
      label: 'Expences',
      data: Utils.numbers({ count: 10, min: 0, max: 40 }),
      borderColor: '#E23738',
      backgroundColor: '#E23738',
      pointRadius: 0,
    },
  ],
}

const configExpences = {
  type: 'line',
  data: dataExpences,
  options: {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
    },
  },
}
if (ctxExpences) {
  const ExpencesChart = new Chart(ctxExpences, configExpences)
}

const ctxCash = document.getElementById('cashChart')
const dataCash = {
  labels: labels,
  datasets: [
    {
      label: 'Cash',
      data: Utils.numbers({ count: 10, min: 0, max: 40 }),
      borderColor: '#2775FF',
      backgroundColor: '#2775FF',
      pointRadius: 0,
    },
  ],
}

const configCash = {
  type: 'line',
  data: dataCash,
  options: {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
    },
  },
}
if (ctxCash) {
  const CashChart = new Chart(ctxCash, configCash)
}

const ctxProfit = document.getElementById('profitChart')
const dataProfit = {
  labels: labels,
  datasets: [
    {
      label: 'Profit',
      data: Utils.numbers({ count: 10, min: 0, max: 40 }),
      borderColor: '#EC8C56',
      backgroundColor: '#EC8C56',
      pointRadius: 0,
    },
  ],
}

const configProfit = {
  type: 'line',
  data: dataProfit,
  options: {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
    },
  },
}
if (ctxProfit) {
  const ProfitChart = new Chart(ctxProfit, configProfit)
}

const ctxEmployee = document.getElementById('employeeChart')

const configEmployee = {
  type: 'doughnut',
  data: {
    labels: ['Men', 'Women'],
    datasets: [
      {
        label: '# of Votes',
        data: [70, 30],
        backgroundColor: ['#50D1B2', '#E23738'],
        borderWidth: 0,
        offset: 20,
      },
    ],
  },
  options: {
    rotation: -90,
    circumference: 180,
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    cutout: 50,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        align: 'center',
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 10,
        },
      },
    },
  },
}

if (ctxEmployee) {
  const EmployeeChart = new Chart(ctxEmployee, configEmployee)
}

function colorChart(colorName, colorHex) {
  const ctx = document.getElementById(`${colorName}Chart`)
  const data = {
    labels: labels,
    datasets: [
      {
        label: colorName,
        data: Utils.numbers({ count: 10, min: 0, max: 40 }),
        borderColor: colorHex,
        backgroundColor: colorHex,
        pointRadius: 0,
      },
    ],
  }

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      plugins: {
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
      },
      elements: {
        line: {
          tension: 0.5,
        },
      },
    },
  }
  if (ctx) {
    const chartColor = new Chart(ctx, config)
  }
}
// const ctx = document.getElementById(`${colorName}Chart`)

colorChart('purple', '#7747CA')
colorChart('fuchsia', '#DD50D6')
colorChart('sky', '#0BD6F4')
colorChart('red', '#E23738')

// Stacked Bar Chart

const borderRadius = 70
const borderRadiusAllCorners = {
  topLeft: borderRadius,
  topRight: borderRadius,
  bottomLeft: borderRadius,
  bottomRight: borderRadius,
}

const ctxBarChart = document.getElementById(`barChart`)

const BAR_CFG = { count: 12, min: 0, max: 100 }
const barChartLabels = Utils.months({ count: 6 })
const barChartData = {
  labels: barChartLabels,
  datasets: [
    {
      label: 'Instagram',
      data: Utils.numbers(BAR_CFG),
      backgroundColor: '#7747CA',
      barThickness: 12,
      borderRadius: borderRadiusAllCorners,
      // borderSkipped: false,
    },
    {
      label: 'Facebook',
      data: Utils.numbers(BAR_CFG),
      backgroundColor: '#2775FF',
      barThickness: 12,
      borderRadius: borderRadiusAllCorners,
      // borderSkipped: false,
    },
    {
      label: 'Twitter',
      data: Utils.numbers(BAR_CFG),
      backgroundColor: '#FB7BB8',
      barThickness: 12,
      borderRadius: borderRadiusAllCorners,
    },
  ],
}
const barChartConfig = {
  type: 'bar',
  data: barChartData,
  options: {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        align: 'center',
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  },
}
if (ctxBarChart) {
  const barChart = new Chart(ctxBarChart, barChartConfig)
}

// Active List Grid Btn
const listGridBtn = document.querySelectorAll('.list-grid-btn')
for (let i = 0; i < listGridBtn.length; i++) {
  listGridBtn[i].addEventListener('click', function () {
    const current = document.getElementsByClassName('active')
    current[0].className = current[0].className.replace(' active', '')
    this.className += ' active'
    localStorage.setItem('activeClass', 'true')
  })
}

// Active Side
function makeSidebarActive(sideMenuItem) {
  //Get item siblings
  var siblings = sideMenuItem.siblings()

  //Remove active class on all buttons
  siblings.each(function () {
    $(this).removeClass('active')
  })

  //Add the clicked button class
  sideMenuItem.addClass('active')
}

//Attach events to menu
$(document).ready(function () {
  if (localStorage) {
    var ind = localStorage['sideMenuItem']
    makeSidebarActive($('.sidemenu-item').eq(ind))
  }

  $('.sidemenu-item').click(function () {
    if (localStorage) {
      localStorage['sideMenuItem'] = $(this).index()
    }
    makeSidebarActive($(this))
  })
})

// Open detail modal
const detailButtons = document.querySelectorAll('.show-detail')
const detailModal = document.getElementById('details-modal')

const sidebarTransaction = document.getElementById('transaction-detail')
sidebarTransaction.addEventListener('click', () => {
  detailModal.checked = true
})
detailButtons.forEach((item) => {
  item.addEventListener('click', () => {
    detailModal.checked = true
  })
})

// Open project modal
const addButtons = document.querySelectorAll('.show-add-project')
const projectModal = document.getElementById('project-modal')

// const sidebarTransaction = document.getElementById('transaction-detail')
// sidebarTransaction.addEventListener('click', () => {
//   detailModal.checked = true
// })
addButtons.forEach((item) => {
  item.addEventListener('click', () => {
    projectModal.checked = true
  })
})

// Open add new modal
const innerAddButtons = document.querySelectorAll('.show-add-project-2')
const addModal = document.getElementById('add-modal')

innerAddButtons.forEach((item) => {
  item.addEventListener('click', () => {
    addModal.checked = true
    projectModal.checked = false
  })
})

// Open share project modal
const shareButtons = document.getElementById('show-share-modal')
const shareModal = document.getElementById('share-modal')

shareButtons.addEventListener('click', () => {
  shareModal.checked = true
})

// Open mail modal
const mailButton = document.getElementById('show-mail-modal')
const mailModal = document.getElementById('mail-modal')

mailButton.addEventListener('click', () => {
  mailModal.checked = true
})

const ctxMultiBarChart = document.getElementById(`multiBarChart`)

const multiBarChartLabels = ['Designer', 'Developer', 'Manager', 'Customer']
const multiBarChartData = {
  labels: multiBarChartLabels,
  datasets: [
    {
      label: 'Document',
      data: Utils.numbers(BAR_CFG),
      backgroundColor: '#FB7185',
    },
    {
      label: 'Video',
      data: Utils.numbers(BAR_CFG),
      backgroundColor: '#F0ABFC',
    },
    {
      label: 'Audio',
      data: Utils.numbers(BAR_CFG),
      backgroundColor: '#60A5FA',
    },
    {
      label: 'Images',
      data: Utils.numbers(BAR_CFG),
      backgroundColor: '#A78BFA',
    },
    {
      label: 'Exe',
      data: Utils.numbers(BAR_CFG),
      backgroundColor: '#FB923C',
    },
    {
      label: 'Other',
      data: Utils.numbers(BAR_CFG),
      backgroundColor: '#2DD4BF',
    },
  ],
}
const multiBarChartConfig = {
  type: 'bar',
  data: multiBarChartData,
  options: {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        align: 'center',
        position: 'bottom',
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
    responsive: true,
  },
}
if (ctxMultiBarChart) {
  const multiBarChart = new Chart(ctxMultiBarChart, multiBarChartConfig)
}

const ctxCanvas = document.getElementById('canvas')
// MAP GEO CHART
if (ctxCanvas) {
  fetch('https://unpkg.com/world-atlas/countries-50m.json')
    .then((r) => r.json())
    .then((data) => {
      const countries = ChartGeo.topojson.feature(data, data.objects.countries).features
      const geoChart = new Chart(ctxCanvas.getContext('2d'), {
        type: 'choropleth',
        data: {
          labels: countries.map((d) => d.properties.name),
          datasets: [
            {
              label: 'Google',
              data: countries.slice(0, 10).map((d) => ({ feature: d, value: Math.random() })),
              backgroundColor: '#2775FF',
            },
            {
              label: 'Facebook',
              data: countries.slice(10, 20).map((d) => ({ feature: d, value: Math.random() })),
              backgroundColor: '#50D1B2',
            },
            {
              label: 'Pinterest',
              data: countries.slice(21, 50).map((d) => ({ feature: d, value: Math.random() })),
              backgroundColor: '#E23738',
            },
            {
              label: 'Others',
              data: countries.map((d) => ({ feature: d, value: Math.random() })),
              backgroundColor: '#E8EDF2',
            },
          ],
        },
        options: {
          showOutline: false,
          showGraticule: false,
          plugins: {
            legend: {
              display: true,
              position: 'left',
              align: 'end',
              labels: {
                boxWidth: 8,
                boxHeight: 8,
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
          },
          scales: {
            xy: {
              projection: 'equalEarth',
            },
          },
        },
      })
    })
}
