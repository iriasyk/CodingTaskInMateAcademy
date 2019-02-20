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
function calculateMenAverageAge(people, century) {

    const menFromPeopleList = people.filter(men => men.sex === 'm'); // full array of all men.

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

function test(actual, expected, testName = '') {
    if (actual !== expected) {
        const errorMessage = `Test ${testName} failed: ${actual} is not equal to expected ${expected}`;
        console.error(errorMessage);
    } else {
        console.log(`Test ${testName} passed!`);
    }
}

test(+calculateMenAverageAge(people).toFixed(2), 61.67, 'Average men age');
test(+calculateMenAverageAge(people, 18).toFixed(2), 56.50, `Average men age in 18 century`);

