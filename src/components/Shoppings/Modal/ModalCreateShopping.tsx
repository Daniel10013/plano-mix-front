'use client';

import Modal from "../../Layout/Modal/Modal"

export default function ModalCreateShopping({isOpen, onClose}: {isOpen :boolean, onClose: () => void}) {
    return (
        <Modal title="Cadastro de Shopping" isOpen={isOpen} onClose={onClose} widthMobile={95} width={30}>
            <div className="flex flex-col w-full gap-3">
                <div>
                    <label htmlFor="" className="text-[#535353] text-[20px]">Nome:</label>
                    <input type="text" className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200"/>
                </div>
                <div className="flex gap-2 justify-between">
                    <div className="w-[60%]">
                        <label htmlFor="" className="text-[#535353] text-[20px]">CEP:</label>
                        <input type="text" className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200"/>
                    </div>
                    <div className="w-[30%]">
                        <label htmlFor="" className="text-[#535353] text-[20px]">Número:</label>
                        <input type="text" className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="" className="text-[#535353] text-[20px]">Observação:</label>
                    <textarea  className="w-full text-[20px] h-[200px] p-2 border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200 resize-none"/>
                </div>
                <button className="w-full bg-[#8173FF] p-2 text-[22px] transition-all duration-200 cursor-pointer hover:bg-[#6050f5] rounded-[10px] text-white">Salvar</button>
            </div>
        </Modal>
    )  
}