"use client"

import { PlusIcon } from "@heroicons/react/24/outline"
import AccordionClassification from "@/src/components/Classifications/AccordionClassification"
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";


export default function ListClassification() {
    const dados: Array<{
        classification_id: number;
        classification: string;
        segment_id: number;
        segment: string;
        activity_id: number | null;
        activity: string | null;
    }> = [
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 1,
                "segment": "MODA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 2,
                "segment": "HIPERMERCADO / SUPERMERCADO / ATACAREJO",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 3,
                "segment": "ARTIGOS ESPORTIVOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 4,
                "segment": "CONSTRUÇÃO E DECORAÇÃO",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 5,
                "segment": "ELETRODOMÉSTICOS E ELETROELETRÔNICOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 6,
                "segment": "MAGAZINES E/OU UTENSÍLIOS PARA O LAR E CONVENIÊNCIA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 7,
                "segment": "MATERIAL DE ESCRITÓRIO / PAPELARIA / INFORMÁTICA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 8,
                "segment": "BRINQUEDOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 9,
                "segment": "PUERICULTURA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 10,
                "segment": "ARTIGOS PARA FESTAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 11,
                "segment": "LIVRARIAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 12,
                "segment": "PET CENTERS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 13,
                "segment": "ACADEMIAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 14,
                "segment": "CENTROS MÉDICOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 15,
                "segment": "CENTROS EDUCACIONAIS / ESCOLAS / FACULDADES / UNIVERSIDADES",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 16,
                "segment": "SERVIÇOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 17,
                "segment": "ALIMENTAÇÃO E BEBIDAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 1,
                "classification": "LOJAS ÂNCORA",
                "segment_id": 18,
                "segment": "OUTROS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 19,
                "segment": "MODA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 20,
                "segment": "HIPERMERCADO / SUPERMERCADO / ATACAREJO",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 21,
                "segment": "ARTIGOS ESPORTIVOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 22,
                "segment": "CONSTRUÇÃO E DECORAÇÃO",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 23,
                "segment": "ELETRODOMÉSTICOS E ELETROELETRÔNICOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 24,
                "segment": "MAGAZINES E/OU UTENSÍLIOS PARA O LAR E CONVENIÊNCIA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 25,
                "segment": "MATERIAL DE ESCRITÓRIO / PAPELARIA / INFORMÁTICA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 26,
                "segment": "BRINQUEDOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 27,
                "segment": "PUERICULTURA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 28,
                "segment": "ARTIGOS PARA FESTAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 29,
                "segment": "LIVRARIAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 30,
                "segment": "PET CENTERS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 31,
                "segment": "GEEK",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 32,
                "segment": "ACADEMIAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 33,
                "segment": "CENTROS MÉDICOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 34,
                "segment": "CENTROS EDUCACIONAIS / ESCOLAS / FACULDADES / UNIVERSIDADES",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 35,
                "segment": "SERVIÇOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 36,
                "segment": "ALIMENTAÇÃO E BEBIDAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 2,
                "classification": "SEMI-ÂNCORA",
                "segment_id": 37,
                "segment": "OUTROS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 38,
                "segment": "MODA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 39,
                "segment": "HIPERMERCADO / SUPERMERCADO / ATACAREJO",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 40,
                "segment": "ARTIGOS ESPORTIVOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 41,
                "segment": "CONSTRUÇÃO E DECORAÇÃO",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 42,
                "segment": "ELETRODOMÉSTICOS E ELETROELETRÔNICOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 43,
                "segment": "MAGAZINES E/OU UTENSÍLIOS PARA O LAR E CONVENIÊNCIA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 44,
                "segment": "MATERIAL DE ESCRITÓRIO / PAPELARIA / INFORMÁTICA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 45,
                "segment": "BRINQUEDOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 46,
                "segment": "PUERICULTURA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 47,
                "segment": "ARTIGOS PARA FESTAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 48,
                "segment": "LIVRARIAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 49,
                "segment": "PET CENTERS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 50,
                "segment": "GEEK",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 51,
                "segment": "ACADEMIAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 52,
                "segment": "CENTROS MÉDICOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 53,
                "segment": "CENTROS EDUCACIONAIS / ESCOLAS / FACULDADES / UNIVERSIDADES",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 54,
                "segment": "SERVIÇOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 55,
                "segment": "ALIMENTAÇÃO E BEBIDAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 3,
                "classification": "MEGALOJAS",
                "segment_id": 56,
                "segment": "OUTROS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 57,
                "segment": "VESTUÁRIO",
                "activity_id": 1,
                "activity": "MODA GERAL"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 57,
                "segment": "VESTUÁRIO",
                "activity_id": 2,
                "activity": "MODA UNISSEX"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 57,
                "segment": "VESTUÁRIO",
                "activity_id": 3,
                "activity": "MODA FEMININA"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 57,
                "segment": "VESTUÁRIO",
                "activity_id": 4,
                "activity": "MODA MASCULINA"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 57,
                "segment": "VESTUÁRIO",
                "activity_id": 5,
                "activity": "MODA INFANTIL"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 57,
                "segment": "VESTUÁRIO",
                "activity_id": 6,
                "activity": "MODA PRAIA"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 57,
                "segment": "VESTUÁRIO",
                "activity_id": 7,
                "activity": "MODA ESPORTIVA"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 57,
                "segment": "VESTUÁRIO",
                "activity_id": 8,
                "activity": "SURFWEAR / STREETWEAR"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 57,
                "segment": "VESTUÁRIO",
                "activity_id": 9,
                "activity": "MODA ÍNTIMA E ROUPAS PARA DORMIR"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 57,
                "segment": "VESTUÁRIO",
                "activity_id": 10,
                "activity": "BRECHÓ / MODA CIRCULAR"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 57,
                "segment": "VESTUÁRIO",
                "activity_id": 11,
                "activity": "ACESSÓRIOS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 57,
                "segment": "VESTUÁRIO",
                "activity_id": 12,
                "activity": "OUTROS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 58,
                "segment": "CALÇADOS",
                "activity_id": 13,
                "activity": "CALÇADOS GERAL"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 58,
                "segment": "CALÇADOS",
                "activity_id": 14,
                "activity": "CALÇADOS FEMININOS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 58,
                "segment": "CALÇADOS",
                "activity_id": 15,
                "activity": "CALÇADOS MASCULINOS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 58,
                "segment": "CALÇADOS",
                "activity_id": 16,
                "activity": "CALÇADOS INFANTIS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 58,
                "segment": "CALÇADOS",
                "activity_id": 17,
                "activity": "CALÇADOS ESPORTIVOS (TÊNIS)"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 58,
                "segment": "CALÇADOS",
                "activity_id": 18,
                "activity": "CALÇADOS ESPECIALIZADOS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 59,
                "segment": "ARTIGOS PARA O LAR",
                "activity_id": 19,
                "activity": "ELETRODOMÉSTICOS E ELETRÔNICOS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 59,
                "segment": "ARTIGOS PARA O LAR",
                "activity_id": 20,
                "activity": "MÓVEIS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 59,
                "segment": "ARTIGOS PARA O LAR",
                "activity_id": 21,
                "activity": "CAMA / MESA / BANHO"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 59,
                "segment": "ARTIGOS PARA O LAR",
                "activity_id": 22,
                "activity": "COLCHÕES"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 59,
                "segment": "ARTIGOS PARA O LAR",
                "activity_id": 23,
                "activity": "UTENSÍLIOS PARA O LAR, ACESSÓRIOS PARA DECORAÇÃO E PRESENTES"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 59,
                "segment": "ARTIGOS PARA O LAR",
                "activity_id": 24,
                "activity": "OUTROS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 60,
                "segment": "TELEFONIA E ACESSÓRIOS",
                "activity_id": 25,
                "activity": "TELEFONIA GERAL"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 61,
                "segment": "ARTIGOS DIVERSOS",
                "activity_id": 26,
                "activity": "ARTIGOS ELETRÔNICOS / TECNOLOGIA DA INFORMAÇÃO (TI)"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 61,
                "segment": "ARTIGOS DIVERSOS",
                "activity_id": 27,
                "activity": "LIVRARIA"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 61,
                "segment": "ARTIGOS DIVERSOS",
                "activity_id": 28,
                "activity": "BRINQUEDOS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 61,
                "segment": "ARTIGOS DIVERSOS",
                "activity_id": 29,
                "activity": "PUERICULTURA"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 61,
                "segment": "ARTIGOS DIVERSOS",
                "activity_id": 30,
                "activity": "ARTIGOS PARA FESTAS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 61,
                "segment": "ARTIGOS DIVERSOS",
                "activity_id": 31,
                "activity": "ACESSÓRIOS E ARTIGOS PARA VIAGENS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 61,
                "segment": "ARTIGOS DIVERSOS",
                "activity_id": 32,
                "activity": "OUTROS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 62,
                "segment": "ÓTICAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 63,
                "segment": "PERFUMARIA, MAQUIAGEM E COSMÉTICOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 64,
                "segment": "RELOJOARIAS E JOALHERIAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 65,
                "segment": "ALIMENTAÇÃO E BEBIDAS",
                "activity_id": 33,
                "activity": "RESTAURANTE COM SERVIÇOS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 65,
                "segment": "ALIMENTAÇÃO E BEBIDAS",
                "activity_id": 34,
                "activity": "RESTAURANTE SEM SERVIÇOS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 65,
                "segment": "ALIMENTAÇÃO E BEBIDAS",
                "activity_id": 35,
                "activity": "FAST-FOOD"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 65,
                "segment": "ALIMENTAÇÃO E BEBIDAS",
                "activity_id": 36,
                "activity": "CAFÉS E CHÁS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 65,
                "segment": "ALIMENTAÇÃO E BEBIDAS",
                "activity_id": 37,
                "activity": "DOCERIAS"
            },
            {
                "classification_id": 4,
                "classification": "LOJAS SATÉLITE",
                "segment_id": 65,
                "segment": "ALIMENTAÇÃO E BEBIDAS",
                "activity_id": 38,
                "activity": "OUTROS"
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 66,
                "segment": "EMPÓRIOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 67,
                "segment": "ALIMENTOS ESPECIAIS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 68,
                "segment": "FARMÁCIAS E DROGARIAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 69,
                "segment": "FLORICULTURA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 70,
                "segment": "BAZAR",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 71,
                "segment": "SERVIÇOS FINANCEIROS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 72,
                "segment": "CORREIO",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 73,
                "segment": "SERVIÇOS ESTÉTICOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 74,
                "segment": "FOTO REVELAÇÃO",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 75,
                "segment": "EDUCAÇÃO / ENSINO",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 76,
                "segment": "SERVIÇOS MÉDICOS (CLÍNICAS / LABORATÓRIOS)",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 77,
                "segment": "LOTÉRICA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 78,
                "segment": "AGÊNCIA DE VIAGENS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 79,
                "segment": "LAVANDERIA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 80,
                "segment": "CHAVEIRO",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 81,
                "segment": "CONSERTOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 82,
                "segment": "MASSAGEM / SPA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 83,
                "segment": "POSTOS DE COMBUSTÍVEIS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 84,
                "segment": "TATUAGEM / PIERCING",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 85,
                "segment": "PET",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 86,
                "segment": "SERVIÇOS AUTOMOTIVOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 87,
                "segment": "SERVIÇOS GRÁFICOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 88,
                "segment": "SERVIÇOS PÚBLICOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 89,
                "segment": "VENDA E LOCAÇÃO DE VEÍCULOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 90,
                "segment": "SERVIÇOS OMNICHANNEL E LOGÍSTICA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 5,
                "classification": "CONVENIÊNCIA / SERVIÇOS",
                "segment_id": 91,
                "segment": "OUTROS SERVIÇOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 6,
                "classification": "ENTRETENIMENTO",
                "segment_id": 92,
                "segment": "CINEMAS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 6,
                "classification": "ENTRETENIMENTO",
                "segment_id": 93,
                "segment": "TEATRO",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 6,
                "classification": "ENTRETENIMENTO",
                "segment_id": 94,
                "segment": "CASA DE SHOWS / ESPAÇO PARA EVENTOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 6,
                "classification": "ENTRETENIMENTO",
                "segment_id": 95,
                "segment": "PARQUES E GAMES",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 6,
                "classification": "ENTRETENIMENTO",
                "segment_id": 96,
                "segment": "BOLICHE",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 6,
                "classification": "ENTRETENIMENTO",
                "segment_id": 97,
                "segment": "BINGO",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 6,
                "classification": "ENTRETENIMENTO",
                "segment_id": 98,
                "segment": "ARENA GAMER",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 6,
                "classification": "ENTRETENIMENTO",
                "segment_id": 99,
                "segment": "OUTROS (MUSEU, ESPAÇO CULTURAL, ETC)",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 39,
                "activity": "VESTUÁRIO"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 40,
                "activity": "CALÇADOS"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 41,
                "activity": "ACESSÓRIOS"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 42,
                "activity": "ARTIGOS PARA O LAR"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 43,
                "activity": "ARTIGOS ESPORTIVOS"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 44,
                "activity": "BRINQUEDOS"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 45,
                "activity": "GEEK"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 46,
                "activity": "ELETRÔNICOS"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 47,
                "activity": "LIVRARIA"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 48,
                "activity": "PAPELARIA"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 49,
                "activity": "ÓTICAS"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 50,
                "activity": "PERFUMARIA, MAQUIAGEM E COSMÉTICOS"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 51,
                "activity": "RELOJOARIAS E JOALHERIAS"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 52,
                "activity": "TELEFONIA E ACESSÓRIOS"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 53,
                "activity": "OUTROS"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 54,
                "activity": "ALIMENTAÇÃO E BEBIDAS"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 100,
                "segment": "QUIOSQUES",
                "activity_id": 55,
                "activity": "CONVENIÊNCIA / SERVIÇOS"
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 101,
                "segment": "VENDING MACHINES",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 102,
                "segment": "EVENTOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 103,
                "segment": "MÍDIA",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 104,
                "segment": "EVENTOS",
                "activity_id": null,
                "activity": null
            },
            {
                "classification_id": 7,
                "classification": "MALL E MERCHANDISING",
                "segment_id": 105,
                "segment": "ANTENAS DE OPERADORAS",
                "activity_id": null,
                "activity": null
            }
        ];

    function groupData(data: any) {
        const result: { [key: number]: any } = {};

        dados.forEach(item => {
            const { classification_id, classification, segment_id, segment, activity_id, activity } = item;

            if (!result[classification_id]) {
                result[classification_id] = {
                    classification_id,
                    classification,
                    segments: {}
                };
            }

            if (!result[classification_id].segments[segment_id]) {
                result[classification_id].segments[segment_id] = {
                    segment_id,
                    segment,
                    activities: []
                };
            }

            if (activity_id && activity) {
                result[classification_id].segments[segment_id].activities.push({
                    activity_id,
                    activity
                });
            }
        });

        return Object.values(result).map(c => ({
            ...c,
            segments: Object.values(c.segments)
        }));
    }

    const grouped = groupData(dados);

    return (
        <>
            <div className="w-full gap-4 flex flex-col items-center">
                <div className="flex xl:flex-row w-full xl:w-[60%] justify-between">
                    <h1 className="w-[50%] flex items-center text-3xl text-gray-500">Classificação</h1>
                    <button
                        onClick={() => { console.log("teste") }}
                        className="p-2 w-[15%] xl:w-[30%] bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] transition-all duration-200 hover:bg-[#4f3fdd] cursor-pointer"
                    >
                        <span className="hidden xl:inline text-2xl">Nova Classificação</span>
                        <PlusIcon height={28} />
                    </button>
                </div>

                <div className="w-full space-y-2 flex flex-col xl:items-center gap-1">
                    {grouped.map(classif => (
                        <AccordionClassification
                            key={classif.classification_id}
                            title={
                                <div className="flex items-center justify-between w-full">
                                    <span>{classif.classification}</span>

                                    <div className="flex gap-1 xl:gap-2 xl:mr-10 mr-2 ">
                                        <button
                                            onClick={() => console.log("edit classification", classif.classification_id)}
                                            className="p-1 hover:bg-gray-200 rounded"
                                        >
                                            <Pencil2Icon className="xl:w-6 xl:h-6 w-5 h-5 text-[#6DA7FF]" />
                                        </button>

                                        <button
                                            onClick={() => console.log("delete classification", classif.classification_id)}
                                            className="p-1 hover:bg-gray-200 rounded"
                                        >
                                            <TrashIcon className="xl:w-6 xl:h-6 w-5 h-5 text-[#FF6767]" />
                                        </button>
                                    </div>
                                </div>
                            }
                            className="w-full xl:w-[40%]"
                        >
                            {classif.segments.map((segment: any) => (
                                <AccordionClassification
                                    key={segment.segment_id}
                                    title={
                                        <div className="flex items-center justify-between w-full">
                                            <span>{segment.segment}</span>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => console.log("edit segment", segment.segment_id)}
                                                    className="p-1 hover:bg-gray-200 rounded"
                                                >
                                                    <Pencil2Icon className="xl:w-5 xl:h-5 w-4 h-4 text-[#6DA7FF]" />
                                                </button>

                                                <button
                                                    onClick={() => console.log("delete segment", segment.segment_id)}
                                                    className="p-1 hover:bg-gray-200 rounded"
                                                >
                                                    <TrashIcon className="xl:w-5 xl:h-5 w-4 h-4 text-[#FF6767]" />
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    className="w-full xl:w-full"
                                >
                                    {segment.activities.length === 0 ? (
                                        <p className="text-sm text-gray-500">(sem atividades)</p>
                                    ) : (
                                        segment.activities.map((act: any) => (
                                            <div
                                                key={act.activity_id}
                                                className="p-2 text-sm rounded flex justify-between items-center"
                                            >
                                                {act.activity}

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => console.log("edit activity", act.activity_id)}
                                                        className="p-1 hover:bg-gray-200 rounded"
                                                    >
                                                        <Pencil2Icon className="xl:w-4 xl:h-4 w-3 h-3 text-[#6DA7FF]" />
                                                    </button>

                                                    <button
                                                        onClick={() => console.log("delete activity", act.activity_id)}
                                                        className="p-1 hover:bg-gray-200 rounded"
                                                    >
                                                        <TrashIcon className="xl:w-4 xl:h-4 w-3 h-3 text-[#FF6767]" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </AccordionClassification>
                            ))}
                        </AccordionClassification>
                    ))}
                </div>


            </div>
        </>
    );
}