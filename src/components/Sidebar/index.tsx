import React from "react";

import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import { useAppSelector } from "Hooks/useState";
import { selectCategories, selectLoading } from "Redux/Categories";

const WrapperFix = styled.div`
  position: fixed;
  background: var(--white-color);
  border-radius: 2rem;
  padding: 3rem 1rem;
  width: 18%;
  min-height: 15rem;
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    width: 100%;
    padding: 0.3rem;
    position: inherit;
    min-height: auto;
  }
`;

const Wrapper = styled.div`
  width: 20rem;
  height: 100%;
  position: relative;
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    width: 100%;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 1rem;
  line-height: 3rem;
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ListItem = styled.li`
  border-radius: 3rem;
  transition: all 0.5s;
  a {
    text-decoration: none;
    color: var(--black-color);
    font-weight: bold;
    font-size: 1.2rem;
    display: block;
    padding-left: 1.2rem;
    border-radius: 3rem;

    &.active {
      background: var(--green-light-color);
    }
    @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
      padding: 0 11px;
    }
  }
  &:hover {
    background: var(--green-light-color);
  }
`;
const SkeletonWrapper = styled.div`
  > * {
    > * {
      margin-bottom: 1rem;
    }
  }
  @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
    > * {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      > * {
        margin: 6px;
        width: 20% !important;
      }
    }
  }
`;

const SideBar = () => {
  const CategoryDetail = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectLoading);

  return (
    <Wrapper>
      <WrapperFix>
        {isLoading && (
          <SkeletonWrapper>
            <Skeleton count={7} width="100%" height={30} />
          </SkeletonWrapper>
        )}
        <List>
          {CategoryDetail &&
            CategoryDetail.map((cat: any) => {
              return (
                <ListItem key={cat.id}>
                  <NavLink to={`/category/${cat.id}`} activeClassName="active">
                    {cat.name}
                  </NavLink>
                </ListItem>
              );
            })}
        </List>
      </WrapperFix>
    </Wrapper>
  );
};

export default SideBar;
