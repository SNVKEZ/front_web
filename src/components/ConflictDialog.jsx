import React from "react";


export default function ConflictDialog({ item, info, onResolve }) {
if (!item || !info) return null;


const reasonText = info.reason === "qty" ? "Количество" : info.reason === "price" ? "Цена" : "Данные";


return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
<div className="bg-white rounded-xl p-6 max-w-lg w-full">
<h3 className="text-lg font-semibold mb-2">Обнаружен конфликт для товара</h3>


<div className="mb-4">
<div className="font-medium">{item.name}</div>
<div className="text-sm text-gray-600">Текущее в корзине: {item.qty} шт, {item.price?.toFixed?.(2)} ₽</div>
</div>


<div className="mb-4 text-sm">
{reasonText} на сервере изменилось:
<div className="mt-2 ml-2">
{info.serverQty !== undefined && <div>Доступно: {info.serverQty} шт</div>}
{info.serverPrice !== undefined && <div>Новая цена: {info.serverPrice} ₽</div>}
</div>
</div>


<div className="flex gap-3 justify-end">
<button
onClick={() => onResolve("remove")}
className="px-4 py-2 rounded bg-red-100 text-red-700"
>
Удалить товар
</button>


<button
onClick={() => onResolve("keep")}
className="px-4 py-2 rounded bg-green-600 text-white"
>
Оставить доступное
</button>
</div>
</div>
</div>
);
}