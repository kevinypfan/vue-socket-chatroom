class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age
  }
  getUserDescription () {
    return `${this.name} is ${this.age} year(s) old`
  }
}

var me = new Person('Amdrew', 26)
console.log(me);
var decription = me.getUserDescription();
console.log(decription);
