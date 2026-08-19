/**
 * @class BasePayloadBuilder
 * @description Clase utilizando el patrón para la construcción, mutación e inyección
 * de datos de prueba en payloads.
 */
export class BasePayloadBuilder {
    /**
     * @constructor
     * @param {Object} [initialData={}] - Datos por defecto al instanciar, la clase lo guarda en this.data.
     */
    constructor(initialData = {}) {
        // Creación de "copia" de la initialData para no alterarlos.
        this.data = { ...initialData};
    }

    /**
     * Permite sobrescribir campos específicos del payload para escenarios particulares.
     * @param {Object} [customOverrides={}] - Objecto con los campos y valores a reemplazar.
     * @return {BasePayloadBuilder} Retorna la instancia actual para permitir encadenamiento.
     */
    withOverrides(customOverrides = {}) {
        this.data = {
            ...this.data,
            ...customOverrides
        };
        return this;
    }


    /**
     * Inyecta un dato corrupto, nulo o malicioso (fuzzing) en los campos que se le indiquen.
     * Ideal para pruebas negativas (Ej. campo email vacío o con SQL Injection).
     * 
     * @param {string|Array<string>} fields - El nombre del campo o campos a afectar.
     * @param {any} payload - El valor malicioso a inyectar
     * @return {BasePayloadBuilder} Retorna la instancia actual para encadenamiento.
     */
    withFuzzing(fields, payload) {
        /*
         Permite que se le pase un solo campo (ej. "email") o una lista de campos 
         ej. ["email", "password"]. Si se le pasa un solo solo, el código lo envuelve
         en un array, para que el resto de la función no falle y procese todo de la 
         misma manera. */
        const fieldsArray = Array.isArray(fields) ? fields : [fields];

        /*
         Recorre cada campo que se le pidió alterar. Usa hasOwnProperty para verificar
         si ese campo realmente existe en el initialData (this.data) 
         */
        fieldsArray.forEach(field => {
            if(Object.prototype.hasOwnProperty.call(this.data, field)) {
                // Si existe en initialData (this.data) sobrescribe el campo 
                // con el dato malicioso (payload) que le pasamos
                this.data[field] = payload;
            } else {
                // Alerta por si en el test nos equivacamos de nombre de un campo de initialData.
                console.warn(`[BasePayloadBuilder] Advertencia: El campo '${field} no existe en el payload base.`)
            }
        });
        return this;
    }


    /**
     * Nos entrega el objeto de datos final, ya ensamblado y listo para usarse en el test.
     * @return {Object} El paquete de datos final.
     */
    build() {
         return { ...this.data };
    }
}