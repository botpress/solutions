/**
 * Small description of your action
 * @title The title displayed in the flow editor
 * @category Custom
 * @author Your_Name
 * @param {string} reference - An example string variable
 * @param {any} multiple - Another Example value
 */
const myAction = async (reference, multiple) => {

    const result = event.nlu.entities.filter(entity => entity.name === 'email').map(function (entity) {
        return entity.data.value;
    });

    if (!result.length) {
        return
    }
    if (multiple) {
        temp[reference] = result
    } else {
        temp[reference] = result[0]
    }



}

return myAction(args.reference, args.multiple)
