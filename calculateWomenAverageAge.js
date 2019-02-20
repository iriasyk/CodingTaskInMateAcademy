'use strict';

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
    // const allPeopleFromList = people.map(p => p); // full array of all people.
    const womenFromPeopleList = people.filter(w => w.sex === 'f'); // full array of all women.
    const ageAllWomen = womenFromPeopleList.map(w => (w.died - w.born)); // full array with the age of all women. 'w' using how to reduce from 'womenFromPeopleList'(to minimize code)

    const matchingKey = womenFromPeopleList.map(ch => ch.name)
        .filter(function (name) {
            return womenFromPeopleList.map(ch => ch.mother)
                .some(function (mother) {
                    return name === mother; // key matching such as name and mom. ["Maria de Rycke", "Livina Haverbeke", "Joanna de Causmaecker", "Joanna de Pape"]
                })
        });

    const womenWithChildren = womenFromPeopleList.map(ch => ch)
        .filter(function (women) {
            return matchingKey.some(function (nameChild) {
                return women.name === nameChild; // creating an object with moms who have children
            })
        });


    const ageWomenWithChildren = womenWithChildren.map(child => (child.died - child.born));

    function averageAgeWoman(array) { // function to get the average age of all men
        try { // code inside the block is executed

            return (array.reduce((a, b) => a + b) / array.length);

        } catch (err) { // If an error occurs in the try block, then a jump to the catch block occurs.

            throw new SyntaxError(`There is s an error in the data. ${withChildren}.`);

        }
    }

    return ((withChildren) ? ( //return based on condition (is there a with children?)
        averageAgeWoman(ageWomenWithChildren) // withChildren present

    ) : (
        averageAgeWoman(ageAllWomen) // withChildren is missing
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

test(+calculateWomenAverageAge(people).toFixed(2), 54.56, 'Average women age');
test(+calculateWomenAverageAge(people, true).toFixed(2), 54.15, 'Average mothers age');