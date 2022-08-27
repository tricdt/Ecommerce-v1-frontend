import AdminLayout from '@admin/components/adminLayout/AdminLayout';
import ShopLayout from '@shop/components/shopLayout/ShopLayout';
import { AdminRoute } from 'hocs/PrivateRoute';
import Error from 'next/error';
import { useDispatch, useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from 'store/store';
import '../styles/globals.scss';

function MyApp({ Component, pageProps, router }) {
   const store = useStore();
   const dispatch = useDispatch();
   if (pageProps.error) {
      return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
   }
   if (router.pathname.startsWith('/admin')) {
      return (
         <PersistGate persistor={store.__persistor} loading={<h1>Loading...</h1>}>
            <AdminRoute>
               <AdminLayout>
                  <Component {...pageProps} />
               </AdminLayout>
            </AdminRoute>
         </PersistGate>
      );
   }
   return (
      <PersistGate persistor={store.__persistor} loading={null}>
         <ShopLayout>
            <Component {...pageProps} />
         </ShopLayout>
      </PersistGate>
   );
}

export default wrapper.withRedux(MyApp);
