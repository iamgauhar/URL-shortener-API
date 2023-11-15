## 1. What is the URL Shortener API?
A URL shortener is a tool or service that takes a long URL and creates a shortened version of it, typically with fewer characters. The primary purpose of URL shorteners is to make links more manageable, especially for sharing on platforms with character limits, like Twitter, or for creating more aesthetically pleasing and easy-to-share links.

## 1. Teck stack and tools used in this project.
 <p>
   <img style="width:72px" src="https://cdn.icon-icons.com/icons2/2699/PNG/512/reactjs_logo_icon_168875.png"/>
   <img style="width:72px" src="https://img.icons8.com/color/512/000000/javascript"/>
   <img style="width:72px" src="https://img.icons8.com/color/512/000000/tailwindcss"/>
   <img style="width:72px" src="https://img.icons8.com/color/512/000000/nodejs.png"/>
   <img style="width:72px" src="https://img.icons8.com/color/512/000000/express-js"/>
   <img style="width:72px" src="https://img.icons8.com/color/512/000000/mysql-logo"/>
   <img style="width:72px" src="https://nodemailer.com/nm_logo_200x136.png"/>
   <img style="width:72px" src="https://jwt.io/img/pic_logo.svg"/>
 </p>

### (I) Other tools.
 - bcryptjs
 - cors
 - dotenv
 - exprss-validator
 - mysql2
 - nanoid
 - winston
 - more...
 
## 2. My URL Shortener Project Github URL.
- **Backend API:** [﻿https://github.com/iamgauhar/URL-shortener-API](https://github.com/iamgauhar/URL-shortener-API) 
- **Frontend:** [﻿https://github.com/iamgauhar/URL-Shortener](https://github.com/iamgauhar/URL-Shortener) 
## 3. Project deployed links.
- **Backend API:** [﻿https://url-shortener-mg.cyclic.app/](https://url-shortener-mg.cyclic.app/) 
- Frontend            Coming Soon/
## 4. API Endpoints?
- **Base URL** `﻿[﻿url-shortener-mg.cyclic.app/](https://url-shortener-mg.cyclic.app/)` 
### (I). Authentication Endpoints.
- **Auth base endpoint:**
```
﻿url-shortener-mg.cyclic.app/auth
```
- **User Signup Endpoint:**
```
`﻿POST` url-shortener-mg.cyclic.app/auth/signup
```
The signup endpoint will accept `first_name (required), last_name, and email (required)`, and after making a POST request, it will send a confirmation email to the user with a confirmation link. The verification link contains `userID` and `token` to verify the user. 

- **Verify the email and set the password? Endpoint:**
```
`﻿POST` url-shortener-mg.cyclic.app/auth/set-password/:id/:token
```
This endpoint will take `ID` and `token` from url `params` and password from `req.body` , and the password should be strong, like a minimum of 8 characters, special characters, captial letters, etc. Your password will be encrypted and secure. 

- **User login endpoint:**
```
﻿`﻿POST` url-shortener-mg.cyclic.app/auth/login
```
This Endpoint will take `email` and `password` to verify user and let you to use our services.

- **Forgot or reset the password? Endpoint:**
```
`﻿POST` url-shortener-mg.cyclic.app/auth/reset-password
```
Using this endpoint, you can reset your password. It will accept `email,` and an email verification link will be sent to your email. After that, you have to do the same process and use the same `Verify email to set the password` endpoint. 



### (II). URL Shortener Endpoints.
- **Base Endpoint** `url-shortener-mg.cyclic.app/url` 
#### Generate a short URL.
To generate a short URL, there are two methods or ways to create short URLs. I'm using both `public` and `private`  methods.

- **Generate a public URL:** This means you can generate a short URL without being logged in, but you can only short limited URLs, and you cannot manage your short URLs like `delete`, `update,etc. ` 
```
`﻿POST` url-shortener-mg.cyclic.app/url/generate/public
```
It will take `original_url` from `req.body` and after proccesing retuns shorten URL.

- **Generate a private URL:** This means you can't generate a short URL without being logged in, but now you can short unlimited URLs, and you can manage your short URLs like  `delete`, `update`,etc. 
```
`﻿POST` url-shortener-mg.cyclic.app/url/generate/private
```
It will take `original_url` from `req.body` and after proccesing retuns shorten URL.

- **Get all URLs:** Using this endpoint, you can retrieve all the urls that you generate and view the number of clicks on each url.
```
`﻿GET` url-shortener-mg.cyclic.app/url/all-urls
```
- **Update original URL:** Using this endpoint, you can update the original URL, and it will take the url ID from `req.params` and the `original_url` from `req.body`. 
```
`﻿PUT` url-shortener-mg.cyclic.app/url/update/:url
```
- **Delete shorten URL:** Using this endpoint, you can delete a shorten URL, and it will take a shorten URL ID from req.params. Now it will be deleted, and nobody can access that URL. 
```
`﻿DELETE` url-shortener-mg.cyclic.app/url/delete/:url
```
---

Thank you 😊.

Mohammad Gauhar

Email: ﻿[﻿iamgauhar@gmail.com](mailto:iamgauhar@gmail.com) 

---



