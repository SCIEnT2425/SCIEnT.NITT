import React, { useState } from 'react';
import { Wrench } from 'lucide-react';
import bpclBanner from '../assets/bpcl-banner.jpg';
import { optimizedImage } from '../utils/optimizedImage';

// Catalogue card for one inventory tool: photo on a white panel (most product
// shots have white backgrounds), category, name, short description and quantity.
// Spacing and borders use bracket values: Bootstrap's px-5/border utilities are
// !important and would override Tailwind's.
const InventoryCard = ({ item }) => {
    const [imgError, setImgError] = useState(false);
    const isBpcl = item.poweredBy === 'BPCL';
    const imageUrl = optimizedImage(item.image?.url, 600);
    const quantity = Number(item.quantity);

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border-[1px] border-zinc-800 bg-zinc-950 transition-colors duration-300 hover:border-zinc-600">
            {/* Absolute image so a tall photo can't stretch the 4:3 frame */}
            <div className="relative flex aspect-[4/3] items-center justify-center bg-white">
                {imageUrl && !imgError ? (
                    <img
                        src={imageUrl}
                        alt={item.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-contain p-[18px]"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <Wrench className="h-14 w-14 text-zinc-300" strokeWidth={1.5} aria-hidden="true" />
                )}
            </div>

            <div className="flex flex-1 flex-col gap-1.5 px-[18px] pt-[18px] pb-[14px]">
                <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#facc15]">
                    {item.category}
                </p>
                <h3 className="m-0 text-[17px] font-semibold leading-snug text-zinc-50">{item.name}</h3>
                {item.description && (
                    <p className="m-0 line-clamp-2 text-[13px] leading-normal text-zinc-400" title={item.description}>
                        {item.description}
                    </p>
                )}
            </div>

            <div className="mx-[18px] border-t border-zinc-800" />
            <p className="m-0 px-[18px] pt-[12px] pb-[14px] text-xs text-zinc-400">
                {quantity > 0 ? `${quantity} ${quantity === 1 ? 'unit' : 'units'}` : 'Quantity not listed'}
            </p>

            {isBpcl && (
                <img
                    src={bpclBanner}
                    alt="Powered by BPCL – Bharat Petroleum"
                    className="block aspect-[8/1] w-full object-cover"
                />
            )}
        </article>
    );
};

export default InventoryCard;
