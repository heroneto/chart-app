import { useEffect, useState } from "react"


interface CurrencyInputProps {
	currency: number,
	setCurrency(val: number): void
}



export function CurrencyInput({ currency, setCurrency }: CurrencyInputProps) {

	const [maskValue, setMaskValue] = useState('');

	const handleChange = (event: any) => {
		const inputValue = event.target.value;
		const numericValue = removeNomNumber(inputValue)

		const formattedValue = formatCurrency(Number(numericValue));
		setMaskValue(formattedValue as any);
	};

	const removeNomNumber = (value: string) => {
		return value.replace(/[^0-9]/g, '');
	}

	const formatCurrency = (value: number) => {
		if (!isNaN(value)) {
			const valueFormated = value / 100
			setCurrency(valueFormated)
			const formattedCurrency = new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			}).format(valueFormated);
			return formattedCurrency;
		} else {
			setCurrency(0)
			return 'R$0,00'
		}
	};

	useEffect(() => {
		setMaskValue(formatCurrency(currency));
	}, [])
	return (
		<>

			<label className='text-sm mb-2 font-medium text-gray-900' htmlFor='valor-produto' >Valor unitário</label>

			<input
				className='bg-gray-200 p-3  rounded-sm  h-10'
				value={maskValue}
				onChange={handleChange}
				type='text'
				placeholder="R$0,00"
				inputMode="numeric"
			/>
		</>
	)
}

// /* eslint-disable */
// import React, { useState } from 'react';

// export const CurrencyInput = () => {
// 	const [value, setValue] = useState(0);

// 	const handleChange = (event: any) => {
// 		const inputValue = event.target.value;
// 		const formattedValue = formatCurrency(inputValue);
// 		setValue(formattedValue as any);
// 	};

// 	const formatCurrency = (value: any) => {
// 		// Remova todos os caracteres não numéricos
// 		const numericValue = value.replace(/[^0-9]/g, '');

// 		// Verifique se o valor é um número
// 		if (!isNaN(numericValue)) {
// 			// Formate o``` número como moeda em Real (BRL)
// 			const formattedCurrency = new Intl.NumberFormat('pt-BR', {
// 				style: 'currency',
// 				currency: 'BRL',
// 			}).format(numericValue / 100); // Divida por 100 para lidar com centavos
// 			return formattedCurrency;
// 		} else {
// 			return 'R$0,00'; // Valor inválido
// 		}
// 	};

// 	return (
// 		<div>
// 			<label>Valor em Real (BRL):</label>
// 			<input
// 				type="text"
// 				placeholder="R$0,00"
// 				value={value}
// 				onChange={handleChange}
// 			/>
// 		</div>
// 	);
// };

