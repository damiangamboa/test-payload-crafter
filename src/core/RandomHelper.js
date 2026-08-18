/**
 * @class
 * @description Utilidad que se encarga de operaciones aleatorias y generación de data.
 * No sabe que es un "chofer" ni un "vehículo", solo sabe devolver strings, números o 
 * elementos de un array.
 */

export class RandomHelper {
     
    /**
     * Devuelve un elemento aleatorio de un array proporcionado.
     * @param {Array<any>} array - El arreglo del cual extraer el elemento
     * @returns {any} Un elemento aleatorio del array.
     * @throws {Error} Si el argumento no es un array o está vacío.
     */
    static pickFromArray(array) {
        if (!Array.isArray(array) || array.length === 0) {
            throw new Error('[RandomHelper.pickFromArray] Se requiere un array no vacío.');
        }
        return array[Math.floor(Math.random() * array.length)];
    }

    //--------------------------------------------------------------------//

    /**
     * Genera una cadena de números aleatorios de una longitud específica.
     * @param {number} lenght - Cantidad de dígitos requeridos.
     * @returns {string} Cadena númerica aleatoria.
     */
    static getRandomDigits(length = 7) {
        let digits = '';
        for (let i = 0; i < length; i++) {
            digits += Math.floor(Math.random() * 10).toString();
        }
        return digits;
    }

    /**
     * Genera un número de teléfono con un prefijo específico.
     * @param {string} prefix - Prefijo del télefono (ej. '811').
     * @param {number} remainingLength - Cantidad de digitos restantes para completar el número.
     * @returns {string} Número de teléfono completo.
     */
    static generatePhone(prefix = '811', remainingLength = 7) {
        return `${prefix}${this.getRandomDigits(remainingLength)}`;
    }

    //--------------------------------------------------------------------//

    /**
     * Genera un timestap corto o completo para garantizar unicidad.
     * @param {boolean} short - Si es true, retorna solo los últimos 6 digitos del timestap.
     * @returns {string|number} Timestap para uso en IDs o correos. 
     */
    static getUniqueTimestamp(short = false) {
        const timestap = Date.now();
        return short ? timestap.toString().slice(-6) : timestap;
    }

    /**
     * Genera un correo electrónico dinámico y único.
     * @param {string} prefix - Prefijo del correo (ej. 'chofer', 'qa').
     * @param {string} domain - Domiino corporativo.
     * @return {string} Correo electrónico estructurado.
     */
    static generateEmail(prefix = 'qa', domain = 'gmail.com') {
        const uniqueId = this.getUniqueTimestamp();
        return `${prefix}.${uniqueId}@${domain}`;
    }
}