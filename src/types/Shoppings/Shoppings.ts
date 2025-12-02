export type Shopping = {
    id: number,
    name: string,
    description: string,
    address: string,
}

export type ShoppingRequest = {
    id: number
    name: string
    observation: string
    zip_code: number
    zip_number: number
}

export type ViaCepResponse = {
    cep: string,
    complemento: string,
    ddd: string,
    estado: string,
    gia: string,
    ibge: string,
    localidade: string,
    logradouro: string,
    regiao: string,
    siafi: string,
    uf: string,
    unidade: string,
    bairro: string
}