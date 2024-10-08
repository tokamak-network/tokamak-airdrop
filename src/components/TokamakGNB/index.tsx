import React, { useEffect, useState } from "react";
import {
  Container,
  Menu,
  MenuControlNextButton,
  MenuControlPrevButton,
  MenuGroup,
  MenuItem,
  MenuControlButton,
} from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import { PrevArrow, NextArrow } from "assets";
import { GNBInfo } from "consts";

export const TokamakGNB: React.FC = () => {
  const navigate = useNavigate();
  const locations = useLocation();

  const currentPathIndex = GNBInfo.findIndex(
    (info) => info.link === locations.pathname
  );

  const [active, setActive] = useState<number>(
    currentPathIndex > -1 ? currentPathIndex : 0
  );

  const onPrevHandler = () => {
    setActive((prev) => prev - 1);
  };
  const onNextHandler = () => {
    setActive((prev) => prev + 1);
  };
  const onItemHandler = (index: number) => {
    setActive(index);
  };

  const calculateWidth = (index: number) => {
    let offset = 0;
    const start = Math.min(index, active);
    const end = Math.max(index, active);

    for (let i = start; i < end; i++) {
      offset =
        offset + (GNBInfo[i].name.length + GNBInfo[i + 1].name.length) * 5 + 30;
    }

    return index > active ? offset : -offset;
  };

  useEffect(() => {
    navigate(GNBInfo[active].link);
  }, [active]);

  return (
    <Container>
      <MenuGroup>
        <MenuControlPrevButton>
          <MenuControlButton onClick={active > 0 ? onPrevHandler : undefined}>
            <PrevArrow />
          </MenuControlButton>
        </MenuControlPrevButton>
        <Menu>
          {GNBInfo.map((info, index) => (
            <MenuItem
              key={index}
              onClick={() => onItemHandler(index)}
              $offset={calculateWidth(index)}
              $active={index === active}
            >
              {info.name}
            </MenuItem>
          ))}
        </Menu>
        <MenuControlNextButton>
          <MenuControlButton
            onClick={active < GNBInfo.length - 1 ? onNextHandler : undefined}
          >
            <NextArrow />
          </MenuControlButton>
        </MenuControlNextButton>
      </MenuGroup>
    </Container>
  );
};
