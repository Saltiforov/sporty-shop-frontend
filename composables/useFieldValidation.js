import { reactive } from 'vue'

export function useFieldValidation(formData, config) {
    const errors = reactive({})



    function validateFields() {
        let isValid = true
        config.value.items.forEach(field => {

            console.log(field.validators)

            const code = field.code
            const value = formData.value[code]

            if (Array.isArray(field.validators)) {
                for (const validator of field.validators) {
                    const result = validator(value)
                    if (result !== true) {
                        errors[code] = result
                        isValid = false
                        break
                    } else {
                        delete errors[code]
                    }
                }
            }
        })

        return isValid
    }

    config.value.items.forEach(field => {
        const code = field.code

        if (!code) return

        watch(() => formData.value[code], (newValue) => {

            if (errors[code]) {
                delete errors[code]
            }
        })
    })

    watch(() =>  config.value.items, (newValue) => {
        resetErrors()
    })

    function resetErrors() {
        Object.keys(errors).forEach(key => {
            delete errors[key]
        })
    }

    return {
        errors,
        validateFields,
        resetErrors,
    }
}
