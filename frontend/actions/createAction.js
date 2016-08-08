let createAction = (type, payloadCreator) => {
    var creaetorIsFunc = typeof payloadCreator === 'function';

    var actionCreator = (...args) => {
        var payload = creaetorIsFunc ? payloadCreator(...args) : args;
        var action = Object.assign({ type }, payload);

        return action;
    };

    actionCreator.type = type;

    return actionCreator;
}

export default createAction;