import api from '../../Api/endpoints/auth'

const getter = async () => {
    try {
        const {data: divisionData} = await api.getOrganization();
    }
    catch (error) {
            console.log('Ошибка )', error)
    }
}

export default getter;