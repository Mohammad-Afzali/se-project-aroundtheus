export default class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _request(url, options) {
      return fetch(url, options).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      });
    }
  
    getInitialCards() {
      return this._request(`${this._baseUrl}/cards`, {
        headers: this._headers,
      });
    }
  
    getUserInfo() {
      return this._request(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: this._headers,
      });
    }
  
    updateUserInfo(data) {
      return this._request(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      });
    }
  
    addNewCard(data) {
      return this._request(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response;
        })
    }
  
    likeCard(cardId) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
        body: JSON.stringify({
          isLiked: true,
        }),
      });
    }
  
    unlikeCard(cardId) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });
    }
  
    deleteCard(cardId) {
      return this._request(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
        .then((response) => {
          return response;
        })
    }
  
    updateAvatar(link) {
      return this._request(`${this._baseURL}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: link,
        }),
      });
    }
  }