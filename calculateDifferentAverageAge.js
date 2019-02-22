'use strict';

/**
 * Возвращает средний возраст мужчин в массиве
 * Если передан `century` то только живших в указанном столетии
 * беря их год смерти, деля его на 100 и округляя: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
*/
function calculateDifferentAverageAge(people, century) {

    const menFromPeopleList = people.filter(p => p.sex === 'm'); // full array of all men.

    const ageAllMen = menFromPeopleList.map(men => (men.died - men.born)); // full array with the age of all men. 'men' using how to reduce from 'menFromPeopleList'(to minimize code)

    const centuryCoincidenceList = menFromPeopleList.filter(men => Math.ceil(men.died/100) === century); // getting century matches from the list
    const ageMenCentury = centuryCoincidenceList.map(men => (men.died - men.born)); // new array with the age of men of a certain century

    function averageAgeMen(array) { // function to get the average age of all men
        try { // code inside the block is executed

            return (array.reduce((a, b) => a + b) / array.length);

        } catch (err) { // If an error occurs in the try block, then a jump to the catch block occurs. An error may occur if the century entered does not exist.

            throw new SyntaxError(`There is s an error in the data. No users from ${century}st century found. Try entering another century after reloading the page.`);

        }
    }

    return ((century) ? ( //return based on condition (is there a century?)
        averageAgeMen(ageMenCentury) // century present

    ) : (
        averageAgeMen(ageAllMen) // century is missing
    ));

}



/**
 * Возвращает средний возраст Женщин в массиве
 * Если передан `withChildren` то только тех у которых есть дети в массиве
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
    const allPeopleFromList = people.map(p => p); // full array of all people.

    const womenFromPeopleList = allPeopleFromList.filter(p => p.sex === 'f'); // full array of all women.
    const ageAllWomen = womenFromPeopleList.map(w => (w.died - w.born)); // full array with the age of all women.

    const matchingKey = womenFromPeopleList.map(w => w.name)
        .filter(function (name) {
            return allPeopleFromList.map(p => p.mother)
                .some(function (mother) {
                    return name === mother; // key matching such as name and mom.
                })
        });

    const womenWithChildren = womenFromPeopleList.map(w => w)
        .filter(function (women) {
            return matchingKey.some(function (nameChild) {
                return women.name === nameChild; // creating an object with moms who have children
            })
        });

    const ageWomenWithChildren = womenWithChildren.map(w => (w.died - w.born)); // array age women with children

    const averageAgeWoman = (array) => { return (array.reduce((a, b) => a + b) / array.length) };

    return ((withChildren) ? ( // return based on condition (is there a with children?)
        averageAgeWoman(ageWomenWithChildren) // withChildren present

    ) : (
        averageAgeWoman(ageAllWomen) // withChildren is missing
    ));
}



/**
 * Возвращает среднюю разницу в возрасте
 * (год рождения ребёнка - год рождения матери)
 * между всеми матерями и их детьми,
 * которые есть в массиве
 *
 * Если передан `onlyWithSon` то только тех у которых сын
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
    const allPeopleFromList = people.map(p => p); // full array of all people.
    const menFromPeopleList = people.filter(p => p.sex === 'm'); // full array of all men.
    const womenFromPeopleList = allPeopleFromList.filter(p => p.sex === 'f'); // full array of all women.

    const matchingKey = womenFromPeopleList.map(w => w.name)
        .filter(function (name) {
            return allPeopleFromList.map(p => p.mother)
                .some(function (mother) {
                    return name === mother; // key matching such as name and mom.(to get women with daughters)
                })
        });

    const womenOnlyWithDaughter = womenFromPeopleList.map(w => w)
        .filter(function (women) {
            return matchingKey.some(function (nameDaughter) {
                return women.name === nameDaughter; // creating an object with moms who have daughter
            })
        });
    console.log('womenOnlyWithDaughter', womenOnlyWithDaughter);

    const yearBornWomenOnlyWithDaughter = womenOnlyWithDaughter.map(w => w.born); // array age women with daughter
    console.log('yearBornWomenOnlyWithDaughter', yearBornWomenOnlyWithDaughter);

    const arrWomenOnlyWithSon = menFromPeopleList.map(m => m.mother); // array of women who have sons

    const ObjWomenOnlyWithSon = womenFromPeopleList.map(w => w)
        .filter(function (nameWomen) {
            return arrWomenOnlyWithSon.some(function (motherSon) {
                return nameWomen.name === motherSon; // objects of women who have sons
            })
        });
    console.log('ObjWomenOnlyWithSon', ObjWomenOnlyWithSon);

    const yearBornWomenOnlyWithSons = ObjWomenOnlyWithSon.map(w => w.born); // array age women with sons
    console.log('yearBornWomenOnlyWithSons', yearBornWomenOnlyWithSons);


    const daughter = womenFromPeopleList.map(w => w)
        .filter(function (name) {
            return womenOnlyWithDaughter.some(function (mother) {
                return name.mother === mother.name;
            })
        });
    console.log('daughter', daughter);

    const bornDaughters = daughter.map(d => d.born); // array age sons
    console.log('bornDaughters', bornDaughters);

    const sons = menFromPeopleList.map(m => m)
        .filter(function (name) {
            return ObjWomenOnlyWithSon.some(function (mother) {
                return name.mother === mother.name; // objects of women who have sons
            })
        });
    console.log('sons', sons);

    const bornSons = sons.map(s => s.born); // array age sons
    console.log('bornSons', bornSons);


    const averageAge = (array) => { return (array.reduce((a, b) => a + b) / array.length) };

    // return ((onlyWithSon) ? ( //return based on condition (is there a only with son?)
    //     averageAge() // onlyWithSon present
    //
    // ) : (
    //     averageAge() // onlyWithSon is missing
    // ));

}


function test(actual, expected, testName = '') {
    if (actual !== expected) {
        const errorMessage = `Test ${testName} failed: ${actual} is not equal to expected ${expected}`;
        console.error(errorMessage);
    } else {
        console.log(`Test ${testName} passed!`);
    }
}

test(+calculateDifferentAverageAge(people).toFixed(2), 61.67, 'Average men age');
test(+calculateDifferentAverageAge(people, 18).toFixed(2), 56.50, `Average men age in 18 century`);
test(+calculateWomenAverageAge(people).toFixed(2), 54.56, 'Average women age');
test(+calculateWomenAverageAge(people, true).toFixed(2), 54.15, 'Average mothers age');
// test(+calculateAverageAgeDiff(people).toFixed(2), 31.22, 'Average age difference');
// test(+calculateAverageAgeDiff(people, true).toFixed(2), 30.08, 'Average age difference with son');
console.log(calculateAverageAgeDiff(people));

