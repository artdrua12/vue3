import { defineStore } from 'pinia'

export const useIndexDBStore = defineStore('indexDB', () => {
  async function setReferenceBooks(referenceBooks) {
    // создание базы данных, request содержит события успешного и неуспешного открытия
    const request = window.indexedDB.open('referenceBooks')

    // если база не создана создаем
    request.onupgradeneeded = function (event) {
      const database = event.target.result //через свойство event.target.result мы можем получить базу данных
      // database.db.deleteObjectStore('books') // пересоздаем хранилище users - сначала удаляем, если оно существует
      database.createObjectStore('books', { keyPath: 'id', autoIncrement: false }) // создание хранилища для referenceBooks
    }

    // при открытии базы данных создаем транзакцию и получаем хранилище
    request.onsuccess = function (event) {
      const database = event.target.result // обращаемся к базе данных
      // создаем транзакцию
      const transaction = database.transaction(['books'], 'readwrite')
      const booksStore = transaction.objectStore('books') // получаем хранилище users

      for (let i = 0; i <= referenceBooks.length - 1; i++) {
        const addRequest = booksStore.put(referenceBooks[i])
        addRequest.onsuccess = () => {
          console.log('id добавленной записи:', addRequest.result) // id добавленной записи: 1
        }
      }
    }

    // в случае ошибки
    request.onerror = function (event) {
      console.log('Проблема с открытием базы данных:', event)
    }
  }

  async function getReferenceBook(id) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('referenceBooks')

      request.onsuccess = function (event) {
        const database = event.target.result // получаем бд
        const transaction = database.transaction('books', 'readonly') // создаем транзакцию
        const booksStore = transaction.objectStore('books') // получаем хранилище users

        let requestData = booksStore.get(id) // получаем объект

        requestData.onsuccess = () => {
          resolve(requestData.result)
        }
      }

      request.onerror = function (event) {
        reject('ошибка с чтением данных:' + event)
      }
    })
  }

  return { setReferenceBooks, getReferenceBook }
})
