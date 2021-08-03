import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const HomePage = lazy(() => import("containers/HomePage"));
const CategoryDetail = lazy(() => import("containers/CategoryDetail"));

const LoadingFallback = () => "";

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/category/:categoryId">
          <CategoryDetail />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
