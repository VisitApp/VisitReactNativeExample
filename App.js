import React from 'react';

import VisitHealthView, {
  fetchHourlyFitnessData,
  fetchDailyFitnessData,
  checkActivityPermission,
  requestActivityPermissionAndGetData,
} from 'Visit-ReactNative';

import {SafeAreaView, Button} from 'react-native';

export default function App() {
  const [cardActive, setCardActive] = React.useState(false);

  function handlePress() {
    setCardActive(true);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {!cardActive ? (
        <>
          <Button
            onPress={handlePress}
            title="Click to see Health Data"
            color="#841584"
          />

          <Button
            onPress={() =>
              fetchDailyFitnessData(1661843593000)
                .then(res => console.log('fetchDailyFitnessData res', res))
                .catch(err => console.log('fetchDailyFitnessData err', err))
            }
            title="Fetch Daily Fitness Data"
            color="#841584"
          />

          <Button
            onPress={() =>
              fetchHourlyFitnessData(1661843593000)
                .then(res => console.log('fetchDailyFitnessData res', res))
                .catch(err => console.log('fetchDailyFitnessData err', err))
            }
            title="Fetch Hourly Fitness Data"
            color="#841584"
          />

          <Button
            onPress={() => {
              checkActivityPermission()
                .then(res => console.log('checkActivityPermission res', {res}))
                .catch(err =>
                  console.log('checkActivityPermission err,', {err}),
                );
            }}
            title="Check Activity Permission"
            color="#841584"
          />

          <Button
            onPress={() => {
              requestActivityPermissionAndGetData()
                .then(res =>
                  console.log('requestActivityPermissionAndGetData res', {
                    res,
                  }),
                )
                .catch(err =>
                  console.log('requestActivityPermissionAndGetData err,', {
                    err,
                  }),
                );
            }}
            title="Request Activity Permission"
            color="#841584"
          />
        </>
      ) : (
        <VisitHealthView
          baseURL="https://pb-step-tracking.getvisitapp.xyz/sso"
          encrypted="hbzIPcea-t98X4yL7_IZyb5LorcZ1XkmgvZxZk9dlRJ1w5JyLWyvtL7GJX8afgcBUjNHKW1h1oB7wWfIn1LieYUlu3PhnWJBPem7Q89ju3dlMQ4t0oLacQ6ZR8ppZUN0"
          clientId="tru-f-12edu"
          onBack={() => setCardActive(false)}
        />
      )}
    </SafeAreaView>
  );
}
