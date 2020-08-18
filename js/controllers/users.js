
import { register, checkResult, login, logout } from "../data.js";


export async function registerPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    this.partial('./templates/users/register.hbs');
}

export async function loginPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    this.partial('./templates/users/login.hbs');
}

export async function logoutUser() {
    try {

        const result = await logout();
        checkResult(result);
        
        this.app.userData.email = '';
        this.app.userData.userToken = '';
        this.app.userData.userId = '';

        localStorage.clear();

        this.redirect('#/login');
    } catch (error) {
        console.log(error.message);
    }
}

export async function registerPost() {
    try {
        if (this.params.email &&
            this.params.password.length >= 6 &&
            this.params.password === this.params['re-password']) {

            const result = await register(this.params.email, this.params.password);
            checkResult(result);

            this.redirect('#/home');
        }

    } catch (error) {
        console.log(error.message);
    }
}

export async function loginPost() {
    try {

        const result = await login(this.params.email, this.params.password);
        checkResult(result);
        
        this.app.userData.email = result.email;
        this.app.userData.userToken = result['user-token'];
        this.app.userData.userId = result.objectId;

        localStorage.setItem('email', result.email);
        localStorage.setItem('userToken', result['user-token']);
        localStorage.setItem('userId', result.objectId);

        this.redirect('#/home');
    } catch (error) {
        console.log(error.message);
    }
}