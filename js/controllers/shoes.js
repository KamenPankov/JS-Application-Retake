import { create, checkResult, getById, edit, remove } from "../data.js";

export async function createPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const context = Object.assign({}, this.app.userData);


    this.partial('./templates/shoes/create.hbs', context);
}

export async function detailsPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const shoe = await getById(this.params.id);
    if (shoe.peopleBought == null) {
        shoe.peopleBought = [];
    }
    const context = Object.assign({ shoe }, this.app.userData);

    if (shoe.ownerId === this.app.userData.userId) {
        context.shoe.canEdit = true;
    } else {
        if (!shoe.peopleBought.includes(this.app.userData.email)) {
            context.shoe.canBuy = true;
        }
    }

    this.partial('./templates/shoes/details.hbs', context);
}

export async function editPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const shoe = await getById(this.params.id);
    const context = Object.assign({ shoe }, this.app.userData);

    if (shoe.ownerId === this.app.userData.userId) {
        context.shoe.canEdit = true;
    }

    this.partial('./templates/shoes/edit.hbs', context);
}

export async function createPost() {

    try {
        const shoe = {
            name: this.params.name,
            price: Number(this.params.price),
            imageUrl: this.params.imageUrl,
            description: this.params.description,
            brand: this.params.brand,
        };
        console.log(this.params);
        if (!Object.values(shoe).some(v => v === '') && shoe.price) {
            shoe.peopleBought = [];
            console.log(shoe);
            const result = await create(shoe);
            checkResult(result);

            this.redirect('#/home');
        }
    } catch (error) {
        console.log(error.message);
    }
}

export async function editPost() {

    try {
        const id = this.params.id;
        const shoe = await getById(id);

        shoe.name = this.params.name;
        shoe.price = Number(this.params.price);
        shoe.imageUrl = this.params.imageUrl;
        shoe.description = this.params.description;
        shoe.brand = this.params.brand;

        if (!Object.values(shoe).some(v => v === '') && shoe.price) {
            const result = await edit(id, shoe);
            checkResult(result);

            this.redirect(`#/details/${result.objectId}`);
        }
    } catch (error) {
        console.log(error.message);
    }
}

export async function erase() {
    try {
        const id = this.params.id;
        const result = await remove(id);
        checkResult(result);

        this.redirect('#/home');
    } catch (error) {
        console.log(error.message);
    }
}

export async function buy() {
    try {
        const id = this.params.id;
        const email = this.app.userData.email;
        const shoe = await getById(id);
        if (shoe.peopleBought == null) {
            shoe.peopleBought = [];
        }

        if (!shoe.peopleBought.includes(email)) {
            shoe.peopleBought.push(email);

            const result = await edit(id, shoe);
            checkResult(result);

            this.redirect(`#/details/${result.objectId}`);
        }
    } catch (error) {
        showError(error.message);
    }
}