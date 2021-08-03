import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "Hooks/useState";
import Button from "components/Button";

import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

import { useParams } from "react-router-dom";

import {
  fetchCategory,
  fetchMore,
  selectCategory,
  selectLoading,
} from "Redux/CategoryDetail";

import { FetchAllCategories, selectCategories } from "Redux/Categories";

interface ParamTypes {
  categoryId: string;
}

export function CategoryDetail() {
  const [pageNumber, setPageNumber] = useState<number>(2);
  const dispatch = useAppDispatch();

  const Category = useAppSelector(selectCategory);
  const isLoading = useAppSelector(selectLoading);
  const Categories = useAppSelector<any>(selectCategories);

  const categoryId = useParams<ParamTypes>();

  const firstCategoryId = Categories.length && Categories[0].id;
  const isHomePage = window.location.pathname == "/";

  const CategoryWrapper = styled.div`
    width: calc(100% - 200px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 30rem;
    @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
      width: 100%;
    }
  `;
  const ImageSection = styled.li`
    margin: 2px;
    height: 30vh;
    flex-grow: 1;
    min-width: 20rem;
    min-height: 10rem;
    @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
      height: auto;
      width: 100%;
      min-width: auto;
      min-height: auto;
    }
  `;
  const Img = styled.img`
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
    border-radius: 1rem;

    @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
      width: 100%;
      max-height: 75vh;
      min-width: 0;
    }
  `;

  const CategorySection = styled.ul`
    display: flex;
    flex-wrap: wrap;

    li:last-child {
      flex-grow: 0;
      min-height: 100px !important;
      min-width: auto;
      // display: none;
    }

    @media (max-aspect-ratio: 1/1) and (max-width: 768px) {
      flex-direction: row;
      padding-left: 0;
    }
  `;

  const ButtonWrapper = styled.div`
    text-align: center;
  `;

  const SkeletonWrapper = styled.div`
    > * {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      > * {
        margin: 6px;
      }
    }
  `;

  useEffect(() => {
    if (!Categories.length) {
      dispatch(FetchAllCategories());
    }
  }, [Categories]);

  useEffect(() => {
    if (isHomePage && !!firstCategoryId) {
      console.log(firstCategoryId);
      dispatch(fetchCategory(firstCategoryId));
    }
  }, [firstCategoryId]);

  useEffect(() => {
    if (categoryId.categoryId) {
      dispatch(fetchCategory(categoryId.categoryId));
    }
  }, [categoryId]);

  const loadMore = () => {
    dispatch(
      fetchMore({
        categoryId: isHomePage ? firstCategoryId : categoryId.categoryId,
        page: pageNumber,
      })
    );
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  return (
    <CategoryWrapper>
      <CategorySection>
        {Category &&
          !isLoading &&
          Category.map((cat: any, index) => {
            return (
              <ImageSection key={cat.id}>
                <Img
                  src={cat.url}
                  alt={cat.name}
                  onLoad={() => console.log("load")}
                ></Img>
              </ImageSection>
            );
          })}
      </CategorySection>
      {isLoading && (
        <SkeletonWrapper>
          <Skeleton count={12} width={250} height={250} />
        </SkeletonWrapper>
      )}
      {!isLoading && (
        <ButtonWrapper>
          <Button loading={!!isLoading} label="More" onClick={loadMore} />
        </ButtonWrapper>
      )}
    </CategoryWrapper>
  );
}

export default CategoryDetail;
