import React, {Component} from 'react';

import VisitHealthView, {
  fetchHourlyFitnessData,
  fetchDailyFitnessData,
  Environment,
} from 'Visit-ReactNative';

import {EventRegister} from 'react-native-event-listeners';

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  NativeModules,
  PermissionsAndroid,
  BackHandler,
  LogBox,
  Alert,
} from 'react-native';
// ...

const visitBaseUrl = 'https://api.samuraijack.xyz/friday';

const errorBaseUrl = 'https://api.samuraijack.xyz';

const token =
  'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.bhUnkbqOCNLdYJuRgtqBVktPvVedQFi0FQznYzC5zJFgN0IRwM_BUM2b8PFtoEsgwIpvNQxW8-0MH9l3YDyUiCbfQehN_y818JlkMK3HROyZR2cTDSslP7KnOEMErOceEh9cLls-8VTp6Vmw6sBMRMPjVf4YPg16wPOShzbLtuJcCZbsw9-N3WzUbq1dq62iGnwjahTYCqUsrTeuuQM1IfR-WNoqJoYF4vB3iWVeQ_89QrFHtvx6oCqHtE_Eh0IPxT4WDtPLYjpEJrxEmcmBlVkDFfCchZ9VQ2h8bwprCgoWUcp2pIuDM4QpCYHE-SZgZm25dgwiDPJ1C7wOvBK8hQ.VACjtW16R68IU15r.fzmt42-GkEI01KdNBzTSPAu3gs7o-dqtuE-g_B_v4MXxcs86Jduqb1EtawU1ei1OiJQF4i27w1EDYEPkpTpO6jSa-RIM-T6VVBSeDbbX7FhS66b_AGIIoEnvYunTA8ytQ-2ILgun1ibLCKYuXfBrHPPW9LIdDXmz1qsExz0xHBi0Uc2gfVWXh2OR7N7E-EDHMqDxS0gpd1k4fYYLBtYNWZfQAX234mn_yg6WqisvCycpqghvPf3h8IYNoolDyYzv9QOhmrv7xEDfPp4RTGJRMqRMKWyQVwJHHrmgns_kv05jPKyuI2v7ba_SR6_z7uGm-fhVaIzobLRzv6Z3yKb16PiYuX49tO1C6_p82d_s0Z3G-A_c_CGEkXsAeKzWvCWMjuT52oVRYCIrYAJbQMAnztKuvZOlddDEyDf8Hka2YN2M6HO6hLkJGZUamc4SOxGE0K-KGS8_vvY1z4y7T8T64726CRHJ04KgprsIV1rkUR6EgYycPpQpUZY8Yw3QMbsadvS62lxzrixwFsAICQSCPA6PJm4vqimYUrl9swxc4VbDttKktAxJu7MZHK2BixY1R_NZkrvTutwWbj8THFdJ_o3elJsxxxosULrTdBgsd8wddiGlGmOe58mPiD9VI7vtC6m1sa9AJTJJTdn3Xut1Ptl7WSO71yS_1mQfv-k4WWFCcitaztRWoqG25oB9Sk2F3uJf-hOn55rZiN4_x403l1GJV-3DkVEakLSy5DxiELiOk7BmmCN050eGce3sND8jLCLEdglu5TRD0vMTXDjuxDdWv1pDQo1Oa1zmoLjwqJMS8NTke1HtEG8m4SWLui5AYfElUkgkRUTHF7SniHqpYDDElXH-cmxCBz5xiElqRQlsW7SrkxenEKPkfCcna6oQuxmuPo9DO7rDCsCt2zNmiupu3-77AenCFAFO9gLJTtpAzXradtrke_FAqL1Z5SAGf5sHOgoDjUYMBjfgQsJxQ1aS_7hyozXxauqFH8_Gvc-J0GYmDQogYbzMNKh2nx2z8o5YG2ZpU5GgAYSh1B6KN4utYDBhG6R_Xb_6FDKhUcgDWN4cmd2QhS2eGue0rCOKk7QnIDLJ5sLXR1-8bC19aQrz-Bo_MargfE90WmT6jx9ZyRTYKkc9IugaCUV2jCgZw8mcKHiAfV3-Y-guOGjVcQ-oairXzhqUvuumL_y5gDHuje5iYLn-QRV-DbnlLGd-AJ7Es7pLDKmvOfalmMuh5brSofXd7UA59XRKz32NIFQTFd0391kbxEL3qZrCp8RtrwXI8IeKAJKuDMMSSwitjr6gWdNTIIMUEpYLbkMhyqncRpIMz0R1-sXZqcRQIF0EwNBncC82uZGRoiCOfq9kEEBz86Mh0DBE4UhB8DrIGmJ-RpsGCydzEA1hGGc2zvCx-qan_lBcViPI0gVR9v5eJHrrNDCxzfoLYCCiiKzYkzK58ZImiLdwYnc4BumwqhYzyR6bDBtuSMyvZyg7X6Usmeyw8dSiXbpyeLKnihHMSYqJ-x0XJAdN7dJ4SXnnSTLr_wQLIkcIIfdLzve8bnYFWhjfj7dXod7R5yZjwP4Ysngy615kUwHkA4XlvuMY0ufH-GODkWLBR-8qS19YbBNrNIKWohCTaFOIhaK_9vqVlBGzYl8zUdS1CYyKnpNFjpAytOqsifTUlxbM-OqYKhU6z39_kflNXoZGJ79rOznAwgLa6NpJo3-eUaKXV7lbUroIgFB2cDFHx55U3YFk-2Ni0f7Sr-LQ3NZURqyROEvTDukAFuZJeDThytZfzGk9SNAKzDMQdzwywXWHAJvtot6T4K_JPeJrt_iob5BTP5xIe8uvQydiZR1R_HDI6qgZg117eQFugRNW0ZqO2ja-_mvU9TzRVI5TnHphmdfX3ITOVkZ-Vyy_Vf7WFo0CM6olpW97FX67wopySGnDMZwSovvuMA0XApn6kS4fCF1O9MSvoE90ezfsjKr0g-eEv1scpK6_9GCjUsa-4UG-RdU4-CUVuMDBc1xIjVshHglNdmnaYoZpWDAEAfaenSJ_Q-ThAOZ_Af2AlYsVhFUkfjTyA9-qvkE6qQmgCZniSr3eOmRHskCXDvLWuCs2vByg4Gjdqg9D1GLpSB8O2AqgSx3pbF05QMCS_wY6atJBhSb_qwpV7A4sQy05-jsgjsYcZExxVrxFx_U-C8eyDvaf7luUk6Sfv-5wK5D7OYwaCDegIUD3PhhkQt4Z-OgJlynIcs5XxybC3co7M6SCHchFuhUlrUQnvS9aHcpF_myv5IEeMetk6TBPW9NFVbAicYM9kLmpL6BisfUQcnMjwOCAyAOmjUYXTu8WSLBis-noDZoSM5ZP960yrutIZ_ILqyDdObYtR6Ap7I_ELgFN7-VfPJYStcTLZR97i2o2rP0LmG-nvNfB7yAWuSfwsQiAiMb4r6YMrC821ExUFAq5W_UEdOed_DFPec-5ym2I1Ttd9cew5oxbMZP6pADcyh6A14truq_L6_5SbSTxXhmhAOgIPQ2yVs-Ri2si_42BrHZAI4TuMmQI34dXRrfq7T8z_Ff-hSuDm7_m1k1tkkwZJB8TZGDjp0wRknfdxiXWyNXE7aqgqlRVeJgO7Wv1m0WeYQrUDoecNySElCIWRC-htWjnXxLXkEbpq0F-IoBCN-PBa84ZHwMHlGPrSxCIMQeS5Z7Zij85t4dUeW4yivYjb0NkufCP0aoLrePjgD5llGEs_eJFMnZKED6xQf5713gpAwU3BLvehsqT7hhYlEKMNEuYaYPbwjIp0Ao-vg62y-0pW73KfYUg05NzD9o0R8ZR3EpnRGF_gadG-45xEkDuc3GpndKoz-QL0SV4CxiKSilJBHSgMpXWpQVbUqJCoL83mbf2hTpEZewVPh7b-IXXIaXt0I5syoIeGPwNb5eVjfX-kmePrxlr0BRpM_bZSYpWAX30_IingZ2YNnEdH4Tq1yfgxu0UdKEUBsxIIM-hxmzPV4TSfqFmIzz4UwTitQVU_lV-I3j1nZV8ar-TdmAZIklrgTszosdsuUgdMB8Y9Wb90zNTrn1EvDgMmDvibBndS2hCA5t6gIDLhRhXAJhRpQm-Cca1JVvt2AQtwKumUXPN0OUXyTv_gAzPbwcQZ88ANaMTPxemC1cOnOTjVi0RItqFqZvJRy5Ly0HUVr7yW9QseA4zzpwr0EGYHw8eK3GWNLpbnM5H0StRxSc_cOL9zOB8mni6gY02xxUSS9HOYcIzncThS4roNODf78Yq79lK9qEv9LyrMFfCjVENiJn93N4VSA-TgZ5Xk6ejVNvEgDX9-h7OL9j1k77ouVOGwMKIepyhJP4Y6lzRjuvZB8lMqYatklMqH5qgH3mCkrr00pYUNWORe8qO_mWGWbNH5HNxVezj4Aaum34dsMxQ85aZBgBEdZNsna4eHZbkqMv5hDMUZZYb8rSuOhQbEDqNXu9kwUXNAt-MVlirC19s3pNY4uQmYdFjS6419kuFPfSERXvSZwS58NfqjoBaODiAP36cu8vU7bsTHQUFsPvncn9orxBfGc53sa0xJmWKO8g9u7xhzQz_aF_EGkFBYUwQTAGIALsvcjn0HKnhe8TVJdAtFtgJBL3XxSs5zH1JRdHSLfRAbeESuy2kF6YcS4isnoJSlw1uwiDXBJhZsTrP53Nx4QLj8zdF6O9UTmBUFO-KpXIPcRvhIdDjwlOfjrF6bSCnFohHUemtfwb9U4ICe-nTLwxNOe4fTs-u3kZsQBiH4V3hjmCI3Ox8j_QcWFnadHcw_kXHfO9y5L85o2BL3GkkkcGNHGmy0Y-wygYUSlS-4usLt0raL0kv7WN_ITeJBCWG5TkRftk4DztHJnZrudd5pmlOHezGskUZfnRRkoMPPhHSk1lqgBXXNCx-iLCYA1l6RH8-ZSqugas-_ko6kXwD3H_bZqolm2e778qtxQgE8KSlir3u1PRdBESTUdgGSMuWXjhv9WOhlhnkNQvvuusGBfRS6o12JjFiWmyMTsoBYmxpz6TOezYBIRvUQrRnbbgfC1zKoromQDUhmXdnZyqz3Rmz9enGFusQWLhFW-uKeY1L-mZoBeR1qj91e7rrgfmvBC0_Xak6zKItyCJeax7udZSKgvyVeAHdGUgKSyPptK1cINHdMy5bdsX95FP1LIL3mumMufzjgVB53nQu9DghnPGG5_iwQoCeydOaK1W3H345Avx1FwRX5-i7n0BYDBJp5sDljound3NgVDIYHLBCTQ237mk7lYYI6SmyMIt8uDotAoG6_G1YkZ-1xTpQlIGyaCmNlTiX6MVy7KhHg55Vw27m9f3Yg6g2UlQ4B24Y7BzBpVsStY077oSfl3wLSNYT-_9na1cHKjVrJiAfju4yaGuegeA5C9zVtvNXOU8tZUv80YZ2TzeWqYvOe8HPa_86KwaShHUv4Q1JNVI9L_LFARGqVEz1Q6aZK7uivVcwqjU__M5hIa6dd0uCeUCG502hDnZc282RqENCfrfyPsXjpJoYqSCEnk5_ge0Co1dWw1fCD1UQcfcz5lDsnZEgAvr-gvCIFnsm5efSllFB6_DdrKWiOKgcdc0HKfV_d5nb3umBhSAQ7l8x8T8LUlPrZnBanvlqFlWPmiaOuVzsldBoCYPc-a0LlQPhho7elG9ogWnRUFcUcSPHYbf8-zkYgpCAQBO4AMLMr8oaL_JsR3UTpJHBviF8L7eoCwQc2cBOODzkKyEfR-VihcFvYa9vE7pGjlflzvWX1AbHzYfhEd2uTGEEC8t1jA7ghT4uSnTiLcxq60LpHtDciJbHXEpTuzQAMagX3xAC_N6ngT72FC5R3ZDrc4BvE3yTiKeQcPquPXzDpifypMGJ4Z-H-PIozL9eExNhtKR5gZ1GSvG9G-Rw9Ph2ZyCghahkEGudZPl8PSt_WXhLIIQgE_zsOyGeeG4pnyjEEIKaeb13Gi1vUe81En5FhuvBC8m0LPRCxBf4pDGYZPws-gwfnm26iJOcs7BrigohLuGOYRcYSy-wM2oCiD-_onuCdMFtrPbAM4kLkItrFvqd4faOf2YGARQtqKNL6WRAVxcx1iYrkBa-yrJE82qSv5iyp684MU4bfS5pIJtgpzOcsyTHAM_R3r259is27yPByYKflerikhHdqsSWgo4_wYL1wDCzQfmBJYKLfIEDrpwQoPX-cic7lGLLvWaW9u6Ea3Ri1I3JiCyhT0OFqHXYyxruhmmEOiai5NJs50YvtF2KRLRfunfVLu0D3nZ8XHw4VdN_5TZLgpL131PFm6ArhmbcSODHQmQcL5pQCw5DV64CZtuUUkofgAYEH5kNeEcxC2vgbcXO9jj8ZA5o2KWoy-KTtRHng_wsZiaJpWcoUijc7c-EBu8i_DdgJNtEssAZGWCQc4VybmF80qL14XrJsCFxWTzhndO6z9oarx_yTxhvSIk1iHweaQ5Vz2DiIyjWHJGTXpD9oZHTu3jzh_LFPSUYaYW2_bCs3BGGx4aVB-7Ue2610pQ1yg8nYansvFvLEhHIrbt6N90HCjVp51uKQ9rdxPMBqWR0OGgT6JpAS5q1U_vHKexpgAwK60wmJkpTHBUBxtNxwqqfHjf1PpZlSRu5ur-MWEZpUr2GI2E-X7Smb2yPX2zAljJIiH05l7_r6PnIWUFsVTp7l_u9grINXbsGJGsm7cq-nRLAXRahk0ygVGr1CUaTLsRdLZ30i0PyO68veXWc2eV4QGfHKzIIANCUZU2v3S6K7-_Lc3pKYDiVDwyTw4mfkhPoq7OYi24rlCPbt3WEeXqScGkhW6cZu49UV66VlR1qYduMbm0FycwTVL9EIekr9JNLxFtStH1ti-Q6min0VdxxCrw0FNp0am66R2PGENFFRAFSM6F4wpBVo97lBwygcBHqaEaC2zVA9fxaLsl9ONMrAP6382_zRUPar2DT9lAXG4bAtMDLYBOkqyUATN5z-v2uocMlZVC3zZ8CjmIMItiW43TDnQnqTbgVsDqbuSWNQ2YEzEqmFy1x2j59oL0zIDp9BdMRdiJkdW06zYoLmgHTau3_3DSChxYjsqXj62rYNF9Wzuix6D2kF0lsloyTsJ4E6nc.xGd6tM9MJfu8cNiF81vA1g';

const id = '13677';

const phone = '9597299278';
const moduleName = 'pharmacy';
// const magicLink =
//   'https://web.getvisitapp.xyz/sso?userParams=qr1JkO1GMtpMkKYzuRj83i8-EGaHKo-GQqODlgv5zydlxn1YfFJ94QaTvthCUGuMKCkEFR-PeqORZmGTeuApBJDFK71qNHReGmO594UTJaHFPQsPx5XLYDWtJGIDy7dTu85xbaiBtnzlBZSK68N-PltjJHgoQUH2upMlHB1th8EzTPHxtuMyYEpNO_IGB3KCCydY_lNlBM1rjJiJh7OPuQ==&clientId=pb-uae-001';

export default class App extends Component {
  componentDidMount() {
    this.listener = EventRegister.addEventListener(
      'unauthorized-wellness-access',
      () => {
        Alert.alert('unauthorized-wellness-access', 'heading happened');
      },
    );
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {/* <Button
      onPress={() =>
        fetchDailyFitnessData(1661843593000)
          .then((res) => console.log('fetchDailyFitnessData res', res))
          .catch((err) => console.log('fetchDailyFitnessData err',  err ))}
      title="Fetch Daily Fitness Data"
      color="#841584"
    />


    <Button
      onPress={() =>
        fetchHourlyFitnessData(1661843593000)
          .then((res) => console.log('fetchDailyFitnessData res', res))
          .catch((err) => console.log('fetchDailyFitnessData err',  err ))}
      title="Fetch Hourly Fitness Data"
      color="#841584"
    /> */}

        <VisitHealthView
          baseUrl={visitBaseUrl}
          errorBaseUrl={'https://star-health.getvisitapp.xyz/'}
          token={token}
          id={id}
          phone={phone}
          // moduleName={null}
          environment={'dev'}
          isLoggingEnabled={true}
          // magicLink={magicLink}
        />
      </SafeAreaView>
    );
  }
}
