import { getAll } from "../data.js";


export async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        shoe: await this.load('./templates/shoes/shoe.hbs'),
    };

    const context = Object.assign({}, this.app.userData);

    if (this.app.userData.email) {
        let shoes = await getAll();
        
        if (shoes) {
            context.shoes = shoes.sort(function (a, b) {
                return b.peopleBought.length - a.peopleBought.length;
            });
            console.log(context.shoes);            
        }
    }

    this.partial('./templates/home.hbs', context);
}