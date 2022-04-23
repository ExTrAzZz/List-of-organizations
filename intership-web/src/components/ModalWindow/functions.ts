
export const addList = async (data, state, get, post, id?) => { // Добавить список
    await post(data, id);
    await get(id).then(result => result.data)
        .then((result) => {
            state.setValue(result);
        })
}

export const changeList = (data: object, id, state, put) => { // Модификация данных листа
    const secondArr = state.arr.map((elem:object) => {
        if(elem['id'] == id) {
            put(data, id);
            data['id'] = id;
            return data
        } else return elem;
    });
    state.setValue(secondArr);
}

export const createObjectPage = (values, page) => { // Запись данных в объект для каждой страницы
    const obj = {}
    switch (page) {
        case 'organization': {
            obj['name'] = values['inpName'];
            obj['address'] = values['inpAddress'];
            obj['INN'] = values['inpINN'];
            break;
        }
        case 'division': {
            obj['name'] = values['inpName'];
            obj['phone'] = values['inpPhone'];
            obj['id_organization'] = values['id']
            break;
        }
        case 'employee': {
            obj['FIO'] = values['inpFIO'];
            obj['address'] = values['inpAddress'];
            obj['position'] = values['inpPosition']
            obj['id_division'] = values['id']
            break;
        }
        default: {
            break;
        }
    }
    return obj

}