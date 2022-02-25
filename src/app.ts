import {crudUser} from './crudUser.js';


function dateTimeDC(target: any, propertyKey: string) {
    Reflect.defineProperty(target, propertyKey, {
      get: () => {
        return new Date().toLocaleString();
      },
      set: (value: string) => {},
    });
  }
class App {
    loadBtn: HTMLButtonElement;
    refreshBtn: HTMLButtonElement;
    _crudUser: crudUser;
    @dateTimeDC
    date: string = "";
    constructor() {
        this.loadBtn = document.getElementById("load-btn")! as HTMLButtonElement;
        this.refreshBtn = document.getElementById("refresh-btn")! as HTMLButtonElement;
        this._crudUser = new crudUser();
        this.loadBtn.addEventListener("click", this.loadData);
        this.refreshBtn.addEventListener("click", this.refreshData);
        this.refreshBtn.style.display = "none";
    }
    loadData = () => {
        this._crudUser.loadData();
        this.refreshBtn.style.display = "block";
        this.loadBtn.style.display = "none";
        document.getElementsByTagName("footer")[0].innerHTML = `Date: ${this.date}`;
    }
    refreshData = () => {
        this._crudUser.refresh();
        document.getElementsByTagName("footer")[0].innerHTML = `Date: ${this.date}`;
    }
}

new App();


