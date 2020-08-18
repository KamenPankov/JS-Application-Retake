import { home } from "./controllers/home.js";
import { registerPage, registerPost, loginPage, loginPost, logoutUser } from "./controllers/users.js";
import { createPage, createPost, detailsPage, editPage, editPost, erase, buy } from "./controllers/shoes.js";

window.addEventListener('load', () => {
    const app = Sammy('main', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            email: localStorage.getItem('email') || '',
            userToken: localStorage.getItem('userToken') || '',
            userId: localStorage.getItem('userId') || '',
        };

        this.get('/', home);
        this.get('#/home', home);
        this.get('#/index.html', home);

        this.get('#/register', registerPage);
        this.get('#/login', loginPage);
        this.get('#/logout', logoutUser);

        this.get('#/create', createPage);
        this.get('#/details/:id', detailsPage);
        this.get('#/edit/:id', editPage);
        this.get('#/delete/:id', erase);
        this.get('#/buy/:id', buy);
       
        this.post('#/register', (ctx) => { registerPost.call(ctx); });
        this.post('#/login', (ctx) => { loginPost.call(ctx); });

        this.post('#/create', (ctx) => { createPost.call(ctx); });
        this.post('#/edit/:id', (ctx) => { editPost.call(ctx); });


    });

    app.run();
})