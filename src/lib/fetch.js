export async function fetchHorarios() {
    try {
        const response = await fetch('/api/horarios');
        if (!response.ok) {
            throw new Error('Error al obtener horarios');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching horarios:', error);
        throw error;
    }
}
export async function fetchAmbientes(){
    try {
        const response = await fetch('/api/ambientes');
        if (!response.ok) {
            throw new Error('Error al obtener ambientes');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching horarios:', error);
        throw error;
    }
}
// Función para obtener datos de fichas
// src/lib/fetch.js
export async function fetchFichas() {
    try {
        const response = await fetch('/api/fichas');
        if (!response.ok) {
            throw new Error('Error al obtener fichas');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching fichas:', error);
        throw error;
    }
}

export async function fetchProgramas() {
    try {
        const response = await fetch('/api/programas');
        if (!response.ok) {
            throw new Error('Error al obtener programas');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching programas:', error);
        throw error;
    }
}

export async function fetchVinculaciones() {
    try {
        const response = await fetch('/api/vinculacion');
        if (!response.ok) {
            throw new Error('Error al obtener vinculaciones');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching vinculaciones:', error);
        throw error;
    }
}

export async function fetchAreas() {
    try {
        const response = await fetch('/api/areas');
        if (!response.ok) {
            throw new Error('Error al obtener áreas');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching areas:', error);
        throw error;
    }
}

export async function fetchPersonas() {
    try {
        const response = await fetch('/api/personas');
        if (!response.ok) {
            throw new Error('Error al obtener personas');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching personas:', error);
        throw error;
    }
}