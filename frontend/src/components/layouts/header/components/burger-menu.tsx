"use client";

import clsx from "clsx";
import { RemoveScroll } from "react-remove-scroll";
import { Address } from "viem";
import { useBoolean } from "minimal-shared";
import { useEffect, useRef } from "react";
import { NavLinks } from "./nav-links";
import { WalletStatus } from "./wallet-status";
import { FaBars } from "react-icons/fa";

interface BurgerMenuProps {
  address?: Address;
}

export function BurgerMenu({ address }: BurgerMenuProps) {
  const {
    value: isMenu,
    onFalse: onCloseMenu,
    onToggle: onToggleMenu,
  } = useBoolean();

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onCloseMenu();
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Overlay */}
      {isMenu && (
        <RemoveScroll>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onToggleMenu}
          />
        </RemoveScroll>
      )}

      <div
        ref={panelRef}
        className={clsx(
          "block md:hidden fixed top-0 right-0 h-full w-52 bg-background-secondary shadow-lg transform transition-transform duration-300 z-50",
          isMenu ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col justify-between h-full p-4">
          <NavLinks address={address} closeBurgerMenu={onCloseMenu} />
          <div className="border-t border-background-hover mt-6 pt-4">
            <WalletStatus address={address} closeBurgerMenu={onCloseMenu} />
          </div>
        </div>
      </div>

      <button
        className="cursor-pointer inline-block md:hidden"
        onClick={onToggleMenu}
      >
        <FaBars
          size={20}
          className={clsx(
            "transition-opacity duration-300",
            isMenu ? "opacity-70" : "opacity-100"
          )}
        />
      </button>
    </>
  );
}
