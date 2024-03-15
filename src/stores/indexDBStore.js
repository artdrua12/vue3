import { defineStore } from 'pinia'

// catalog - хранилище для справочников
// user - хранилище для пользователя, хранит в том числе и permissions

export const useIndexDBStore = defineStore('indexDB', () => {
  // storage- хранилище
  // key - ключ по которому хранится значение
  // value - значение

  async function setToDatabase(storage, key, value) {
    const request = window.indexedDB.open('dataBase') // создание базы данных, request содержит события успешного и неуспешного открытия
    request.onupgradeneeded = function (event) {
      // если база отсутствует, создаем
      const database = event.target.result //через свойство event.target.result мы можем получить базу данных
      database.createObjectStore('catalog', { autoIncrement: false }) // создание хранилища для dataBase
      database.createObjectStore('user', { autoIncrement: false }) // создание хранилища для dataBase
    }

    // при открытии базы данных создаем транзакцию и получаем хранилище
    request.onsuccess = function (event) {
      const database = event.target.result // обращаемся к базе данных
      // создаем транзакцию
      const transaction = database.transaction(storage, 'readwrite')
      const store = transaction.objectStore(storage) // получаем хранилище
      const addRequest = store.put(value, key)

      addRequest.onerror = function () {
        console.log('Ошибка добавления в хранилище')
      }

      // в случае ошибки
      request.onerror = function (event) {
        console.log('Проблема с открытием базы данных:', event)
      }
    }
  }

  async function getFromDatabase(storage, key) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('dataBase') // создание базы данных, request содержит события успешного и неуспешного открытия
      request.onupgradeneeded = function (event) {
        // если база отсутствует, создаем
        const database = event.target.result //через свойство event.target.result мы можем получить базу данных
        database.createObjectStore('catalog', { autoIncrement: false }) // создание хранилища для dataBase
        database.createObjectStore('user', { autoIncrement: false }) // создание хранилища для dataBase
      }

      request.onsuccess = function (event) {
        const database = event.target.result // получаем бд
        const transaction = database.transaction(storage, 'readonly') // создаем транзакцию
        transaction.onerror = function () {
          console.log('ошибка чтения')
        }
        const store = transaction.objectStore(storage) // получаем хранилище

        let requestData = store.get(key) // получаем объект
        requestData.onsuccess = () => {
          resolve(requestData.result)
        }
      }

      request.onerror = function () {
        console.log('ошибка с чтением данных из хранилища')
        reject(null)
      }
    })
  }

  async function getFromDatabase2(storage, key) {
    const request = window.indexedDB.open('dataBase') // создание базы данных, request содержит события успешного и неуспешного открытия
    request.onupgradeneeded = function (event) {
      // если база отсутствует, создаем
      const database = event.target.result //через свойство event.target.result мы можем получить базу данных
      database.createObjectStore('catalog', { autoIncrement: false }) // создание хранилища для dataBase
      database.createObjectStore('user', { autoIncrement: false }) // создание хранилища для dataBase
    }

    request.onsuccess = function (event) {
      const database = event.target.result // получаем бд
      const transaction = database.transaction(storage, 'readonly') // создаем транзакцию
      transaction.onerror = function () {
        console.log('ошибка чтения')
      }
      const store = transaction.objectStore(storage) // получаем хранилище

      let requestData = store.get(key) // получаем объект
      requestData.onsuccess = () => {
        return requestData.result
      }
    }

    request.onerror = function () {
      console.log('ошибка с чтением данных из хранилища')
      return null
    }
  }

  // function clearStoreFromDatabase(storage) {
  //   const request = indexedDB.open('dataBase')

  //   request.onsuccess = function (event) {
  //     const database = event.target.result // получаем бд
  //     const transaction = database.transaction(storage, 'readwrite')
  //     const store = transaction.objectStore(storage) // получаем хранилище
  //     store.clear()
  //   }
  // }

  function deleteDatabase() {
    const DBDeleteRequest = indexedDB.deleteDatabase('dataBase')

    DBDeleteRequest.onsuccess = () => {
      console.log('База данных удалена успешно.')
    }

    DBDeleteRequest.onerror = () => {
      console.error('Ошибка удаления базыданных.')
    }
  }

  return { getFromDatabase, setToDatabase, deleteDatabase, getFromDatabase2 }
})
