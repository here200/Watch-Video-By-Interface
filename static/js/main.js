const routeEl = document.querySelector('.route')
const routeListEl = routeEl.querySelector('.list')
const routeTitleEl = routeEl.querySelector('.title')

// 动态创建列表
for (let index in routes) {
  const liEl = document.createElement('li')
  routeListEl.append(liEl)

  const item = routes[index]
  liEl.textContent = item.name
  liEl.onclick = function() {
    defaultRoute = index
    routeTitleEl.textContent = routes[defaultRoute].name

    // 如果搜索框存在内容，优先使用搜索框的内容。否则，使用缓存的内容
    if (searchEl.value) {
      enterURL = searchEl.value
    }

    play(enterURL)
    localStorage.setItem('default', defaultRoute)
  }
}

const friendEl = document.querySelector('.friendLink')
for (const item of friends) {
  const aEl = document.createElement('a')
  friendEl.append(aEl)

  aEl.textContent = item.name
  aEl.href = item.url
}

// 获取默认路线
let defaultRoute = localStorage.getItem('default') || 0
routeTitleEl.textContent = routes[defaultRoute].name

// 播放功能
const searchEl = document.querySelector('.search')
const playerEl = document.querySelector('.player')
const clickEl = document.querySelector('.click')
const clearEl = document.querySelector('.clear')

let enterURL = ''

// 绑定按钮事件
clickEl.onclick = parseURL
clearEl.onclick = reset

function play(url) {
  playerEl.src = routes[defaultRoute].url + url
}

// 当点击播放时
function parseURL() {
  enterURL = searchEl.value
  play(enterURL)
}

// 当点击清空时
function reset() {
  searchEl.value = ''
}

// 在选中输入框的情况下，按Enter触发解析动作，按Esc键触发输入内容清空动作。
searchEl.onkeyup = function (event) {
  switch (event.key) {
    case 'Enter': { // 回车键
      parseURL()
      break
    }
    case 'Escape': { // ESC键
      reset()
      break
    }
  }
}

// 通过地址栏解析。提取?后面的url的值，并进行解析动作,如果不存在，则不进行解析
const regex = /url=([^&]*)/
const queryString = location.search
const result = queryString.match(regex)
const url = result ? result[1] : null
 
if (url) {
  enterURL = url
  play(url)
  searchEl.value = url
}