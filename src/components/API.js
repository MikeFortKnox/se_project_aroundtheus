class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then(this._handleResponse);
  }

  updateUserProfile(userData) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify(userData),
    }).then(this._handleResponse);
  }
  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error, ${res.status}`);
    }
    return res.json();
  }

  editProfileImage(link) {
    // receive link
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({ avatar: link }),
    }).then(this._handleResponse);
    // .catch((err) => {
    //   console.error(err);
    // });
  }

  handleDeleteCard(cardId) {
    return (
      fetch(`${this._options.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._options.headers,
      })
        // .then((res) => {
        //   if (!res.ok) {
        //     return Promise.reject(`Error: ${res.status}`);
        //   }
        //   return res.json();
        // })
        .then(this._handleResponse)
      // .catch((err) => {
      //   console.error(err);
      // })
    );
  }

  likeACard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._options.headers,
    }).then(this._handleResponse);
    // .catch((err) => {
    //   console.error(err);
    // });
  }

  dislikeACard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._options.headers,
    }).then(this._handleResponse);
    // .catch((err) => {
    //   console.error(err);
    // });
  }

  /* if card is liked - we call dislikeACard, otherwise we call like a Card */

  addCards({ name, link }) {
    return (
      fetch(`${this._options.baseUrl}/cards`, {
        method: "POST",
        headers: this._options.headers,
        body: JSON.stringify({ name, link }),
      })
        // .then((res) => {
        //   if (!res.ok) {
        //     return Promise.reject(`Error: ${res.status}`);
        //   }
        //   return res.json();
        // })
        .then(this._handleResponse)
    );
    // .catch((err) => {
    //   console.error(err);
    // });
  }
}

export default Api;
