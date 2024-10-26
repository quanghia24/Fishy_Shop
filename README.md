## We are creating an online ecommerce website selling electronic junk

### Setting up the app
To create a superuser

`python3 manage.py createsuperuser`

Virtual environment
- `python3 -m venv env`
- `source env/bin/activate`

Backnend
- `pip3 install -r requirements.txt`
- `python3 manage.py migrate`
- `python3 manage.py runserver`

Frontend
- `npm install`
- `npm start`

Incase of couldn't resolve dependencíe
```
rm -Rf frontend/node_modules && rm frontend/package-lock.json 
npm cache clean --force
npm install --force
```
