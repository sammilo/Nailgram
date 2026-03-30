const BASE_URL = '/api/nails'

export const getNails = async () => {
    const response = await fetch(BASE_URL)
    if (!response.ok) throw new Error('Failed to fetch nails')
    return await response.json()
}

export const getNailsById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`)
    if (!response.ok) throw new Error('Failed to fetch nails by id')
    return await response.json()
}

export const createNails = async (nailData) => {
    const response = await fetch(BASE_URL, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nailData)
    })
    if (!response.ok) throw new Error('Failed to create nails')
    return await response.json()
}

export const editNails = async (id, nailData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nailData)
    })
    if (!response.ok) throw new Error('Failed to edit nails')
    return await response.json()
}

export const deleteNails = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete nails')
    return await response.json()
}