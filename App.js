import React from 'react';

import VisitHealthView,{
  fetchHourlyFitnessData,
  fetchDailyFitnessData,
} from 'Visit-ReactNative';

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
} from 'react-native';
// ...

const visitBaseUrl="https://star-health.getvisitapp.xyz/star-health";

const token="eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.j956VVFHmme_rXxxlpBazRWkKXWP_9iWjbJow7UHqo0DCJvH84OI28LyMa5VC-tXFIIaugtse6cPfwUWYO-EVWRliSveP6eKg9NjYlMDBO4DaK2FO4R0lC0z_bTdPbnQNuKDBhMSJD7tLd6TB6jJPEFTf5-PViWiLDe_b74C6V8JJuLFIdSfqMl8hwTMGNINrBtO7Hojfrf6LWxZTkZQKBAi3YNSQcUoprdM8w_gc6TVJ9KxiC30e_XLip30DYaipA0UvLyx1AZscB59ajYlKLgTzgVNtdfkDUZd6wjCXDeFTDY0o8rQOQ4OD5j9_JQL_bOO0aVEEQKsYVLwx-k9ZA.SyfXst7NYYXaJOfw.XJeWMIznCDUx8DjbYM3ZlQGbq_2J55A5i-tkhO4sKoYjiH_vUnolCnBO4x5ztNHgcHnTimhnr5VKb0KP2HYj0fu_T0I91weod9GQa3z9LAclcwJEzyQ3fGDDcL6e29zuqsk1z_eKy0qAULDFZvovMV9ub6hTqPyFLDybuPJib-hsqHAQdx5hb_qY3hOJ14mZu698wIElqYeVy16UMSmpxNvgzrMxbey_xuav1AvOu6Y1H2TMZMmfvRrC8eCYx6n-QvQNJtJagqBfGWNfGYLimUE8VH-G_FilmS1PBzo4tFoRSaBeRkrEOiABvNTZFJNtoiNXkkdVLdBWaIThjfZnxgWa7aebPXnhSAHKLGMoWj-_B3MvPc1KxDxiWrYJ2Rz3nHnK-szIqJPMHhU4QQRvh6DeckEhSEVp7kHTHCQjpoO3zqNOIaF6JUQFGn6Q0UXnIXOyZ236VwVE87-haClAh0UyeeT0XUyKXyCnEKpERevRxrj29cZmw9Q07KSe0iRf79_5tpcz4v_0FwCBSbRC0CmfkrTTARfuSFjF-JVYJZUMuXU7-eJtyQXY5kNjv-U5N3tNOlHzatFJUXH9KqyqkDxHekgx6m9vtXeAt6saRy1wNM-q1QgXNrKnCJyY1Q--dpLoRTdBCpkEeYMnJstUSd-nvHiQ6PKkNvkKijpglHVdpfAzhnLQSpURbqDhIe5P89JjfSvLTGcSm-BgEr-uZbbvdaDHBmU_UUHQNEvdhO_GLch1dO1yZumLyCVrLKUMlTp8v8Mx-lePBY5nzwrsEjODJbJOENWQlmOblfw_SXhQ0Yym9mGPO7dthJcXaxd-K3t2UB5HbxYzidOTsIG2zoyhsWov62U30pTjjqtqDIA7r-VgUQlLwQE6_RRtTq3IGkTmcw49c2u21tb3h-4kWuQ18HInU7BGmarM_ACvPdYxyg_R7RbJcSgIteQyJt8RR4cIuWbg5BKi16su4tFosvagjvRFDr3bWL4DFV1CXu0QWVahPSk9dqcsuo9IAw9ZjasCnmzMjJK6xWzhDFqoAR1A0ZnWxs_LR4XTkpI_v-MmvCFm7mnOZRjQyzhUzDYlUwxYDfEoGhQmEXpS_nk_QInC9HMVp3GdQr3cKwKHImjgDxsiucBlM3CYWQJg8KSN1DAcFJATsQJbwkHw7HcZlJUK7avftoedVQ_Tr5ugCTj4D53482FfO5c-RC2H2jjldp-wJ-xDufx9WyX1sYzNEEI3oY2LU9iAyJNOt3-lGgtuptkoVw0X9YxTB0IhjC8txcKweC_rcMgwdMXfjzQ9vramFqkU7at2IxV3Id9g1qkeEbg30RDbbfACtkw3FQXMRKhiHj4P26CksnXwC0Q9o3_0b-lKzzpyfxmT-SafwpMvIs4fFw78lVLgJ4fjkyIyHMw3yIBs9hTlVq-Qv0JYg-Q-auY_KIJC-4a1PLQs8v6uNeejjuE4w6FybFYXGAQTSfnYAPZM4378ryLV30lrT_eXYXIUkkBHpNp5_TuHO62ke6rZpxN64KzabVoUBtIuLG0abiwGepLn4qMT-51tBs8m626h53jH30mDAfwr1ksBBg1nwZQQsDcB4MbtpKn4_d9Tf1BIgvJ5K45whdg4KtJOQysqQ_1ahqXI7HdLzK5NRlozQoTCmx3wdD9qnsNl8S_rfI9S4aDbdLMIAMmqxwoRP32WhCumTXac1C2xSxrsTEoecl4rC2n6QYpYs9yo5MIirVb5BX6It6v3txOBByVU67DNV0ofKCSoUMmQBOM41jD2zgDd6XU9V64XgV9O5tDl2QWF0FmzbFsHFivDhxtUJiuhW0jWpZzCHfzi1RjGjV3EYYA3Ron5rHBy3QBL0WNY_gBPkY_y-RQFQ3W6mkaOu8hrLKXjKGL67sMEw793Lo6D5tg4tBkbmCcADhMme5UMaXxO2BWRxZl47pRdIrWJUiIyGoWh4nDd81O2WmV52AeAS7ghNoPE39j40JZH8s29JsKIXM6R-ePgjq8xOWSWWRRCmvKzk3wryEAIxD2Fosa6v3BRyxuRNniwwX7AOQsb6xBnH6b1uog7FHi11yKQ5fJtULLFOkrBguQFZS8oMasIEaoGY2jEl0kEEfL-st3XjVqghsU_j7To9zP4BmZkDw2dnN-Sj5gYpg8p_9phjgRr8Sk_RDI1SM8ECJiKS8WFyo3XyOvyCHxq7lrPOoOj6fhkN2WAO93LWUnMVyooA5SQlfYGxOe5fBxx8Etxwqn7Tx5l8t6LkNsSojoCrQt76rl2jmnnV11ANDLg0ECGMXguwYGq3uFqwZgxgf5VkIa7BOMGUzTGYGnxd4WDN3APSgtXXCB5COPDyusD4kuPIuaVfm0L-iPuBM9NXsCNULQsIJBE-QB4IipUapC8rBE40xloda07JvaR_914g-SGS9BhXI8dqDBhLGEwzO_fynyqpzKMBL1SYNLegTh2ttJ7_8-sKPH5Ml_36r8QDGuAOdubCqRJhOaZaL0V_qw82eXXxH7NtBKCcpF1sJwW1VQNqYVPLQtQPnn-MNvYhTrr8e8MZVXv020p3UtQy2Fv9pHIRm4ffAg_OzQ8vfYrBsUZl70-fQSIAjF1y21xi-zdoCaZ5wATSJhghfexc6izUJWE3DPanh8XwwjKYqJf_GzkE2GIWmYJ6rm7ZlUe1DukIT03NMO9zRNtg0hz5DTVQYFYoTxeEenCFzQ2dkvqkGnFZpnl9Lbl0oxHhXy18qkUU5B8NelohLr3Dci8iyx4fdJZRMoe9C5adkGEOaypfSg8BYEfG2eGnxhMWPzYYQKNLRBlKe8Qe4oGd1UDW34Dl4MjYKERO0FGmkmWlaBRnln2GM9MFNw9A6Hdkr4OPDu3213UCxbEGOuouRCpH-dRpxh7MwFZV3HEkIRiAOs-lQWxd6jvQmZUxconXikSV4b2Q3ZDvmHWwSI62ETToPoQYm9eeQ709cM9KiMWDDsllAc9uOGSHip1hFJPDuYDezDCcXTzwFp7VomhET_3bm7kGMLaYs2K7qn4huKdGf8YXq6SjYB8HXke4R2xqK1Q3Y2rnj5yxK3VEq1d13KNM7oFG8QhwUJeOqcY3arZm8vwpCgjbntPfOw5vGGpHZC0wqCLUjZvyd2bKU8scso4zRBF_cGr3ClBI7FWDMqFxJfjnfTBDhbOQv01vm2Qwmg78RWIoob9YvICM4ZoTdsVocL802zbAPk4P33LWiFPltHCF2ebSMQbnfr255nzUU_0MrR3ATvGtn9ivqcb9oCh6Wp1uN5wUpuGqFG_NzYxxZqt5cV97HGJOMHQ9wdZMPRa_dmuQRrJSWykN2HACPXEdTc2uX7EYZ931sWd_paPF6Dv1MNYPUzZS9ZZ3w_TcvUtFSYARMJGx8labQPz1fEhgpz0ELo5qOfig31RcUV-edbzMOfWMmoxkM-QnmdEwm0P-Lt4nzsgnISzvT-_LlSWliq5IiFe52JQCdFYBxvpp_1MXdzPzTu3u_vjy6tbQEwfrKcxwt7yBwkd5KadiNRrcF92BDTr-f5DmP0aZVsr_mZEA0dH24f4vaGV-PfirYO98H3dUjjRMu23A3uHCAufpJG0uGLRL1I4eaJsTeUO27BM9yTYRkReC8ZE_WOzmbLK--H04xpPU2F9N8e5zwKhlgbOq9-77MqY6M0fzQgyl_s_kcyT9poSEk3eITOACMtut2zj_q99MXVN1NbwpE1NZ9X4u-C0bp1xJtiZFaF9xPraoblDF4taR4-TpILBUVlIon0oz9hTaTLnN3ptoZJv2u2NFP_x46vXchlcVKNkDGG6t1B-5hbxToYvKD_iqYxFwublU80tYBK701bmIk7nqnHznd6chAV4rUj0Fhj-4NWfdpFc0wOe_poSXzxUEO-pL5BnwT_Q9DwflS8nUvFsn6awJOKsBQrpaaVVClqIX8ZTVopRYqNg8HWc6lpIP6YTvhNkh1aY0Sk47bDd5eVoyeZ_UYcRtfAz3HuKd4jcAd_tvzlBsZ4YfQ6dT_a6nQuAOwWGCY6A52osj8sIfMXJtttKujECJeDBULQdXeX0DWcdBeyQQfOJW2XX4AtuNSQnaItTDzVUf3xYcTIcnYyPMBzwszQ-ryBMY4nJ-3dS6-D1ucFaNJh7OKpOpzwA1wEkblNBeA51LUtKEH2zQv6-K-OFFPKKznHz5pY1gdxP8YJojJkhYCi6gxCA-nxQ1PijfRxR7aG7RWF6qPUfi7ziizKmdFja3Ye4OwdZnCYZn0a1ENNytHJaZl0C_tHZBkL1DXx4LTCfdrPWTV5dVPGIyhCkhbOoCpTqS7l2iNS4XW4FCTCeSXHhMBCEqLAc4MIs6dLiP2PUekChaVQNvr0p4NtnWIccsDp37OIwhRDKsyTCsyT-DNeqGwTPeRm_f61Ye-1g3S4hjb5IxQQdBgMmSI9aQEUPn99gMk1Us355iBgLNL6x2sOlvjv0ndKge23hiXVUNabHbXO_j8wsbYlHpbmY6_PUcqJO5X8o-eM3k-YKq2OTtDy8LiyvCy03iIw02-6LB-1x5of6Z_isMyRhcx2x4Ymj_HQyhwBdorGGsUKcU_V5LJiFsiOgq5KeqoFipJar54buFkEB3PyL2_pfgOnvQMMeEFvVkTy54TDu8KhqrijBLegGYA-VISes9M3W1NgdUhEGWtMbM7LEymJ84pcAlX0bK2SVqDLTPR7xfxhff8xqnq4MUb2lr08oy07SkYC668Lrty0nB_loIfTzLflyd5vIaG6XJ1cGkuUyIseipy_7Yak6b0wwDYXPO41xpZTudOxB8L-RByw6GQ6Cnfyoiivd8gInm2xFki2T4RrephGI9CMWCZcsagBuK2RTzgsP_C713AyIawjNx6jgJE--xqSrm8ooXQAlz7godnP2fLlT98xz4YFmarG8xM-FZ_e4MwF30wskWIXBwXaBPwqytoB0Pnoe-8QnTG7U38CelSxo11HtXYmKZPZ1F8-Ioom_5iLGZLRumzJRxGQiQ71AVojbNy-NZe_UHCkzaEzuVlSrXxC8m_LktXTeeG-BYxYPeGq2QECtqUIHeVTr1wcHzs33DsMNYXcv9JiB-87E_SH8xh5NvDL_84FfA3oil2lAQGogrwLMc04uNQfhor60dj5Ap2H2sU2RCCkq-cBo_WKMmuy7pXqTgCoROwynzTSF7E-fNTanRRKSY-fj8IsAtaKXMmh8dj0WE4Frm_w0hkMnC4esRCqMJkJrirNlHdqpbKBjUOZaaD-_ctYgo-tDlDWASTGOcHlTp44U_bZzv4DwdF6wchPCuag5HSAlJ14JlZPu-ui23xCBcWc_qJ5YmQ0oLAe7RGChmHFKXneT6yczG2pT-Befd26vcG_9jByMh6FPuJ_-7X2IqeUD7mhfvmFwkxHdVfK_HTYeGHDw-TvzOck1dxDFcNJdOMSwTY3lebofk86E8xUcO-9MQmeXKrsY4j0NW9Ai3WxC9AQh6cjQtIs-zLPCUiTkFtl_sF08E2jBiVmR61EKr1F1mBrbIZ1bkP9g6V381N78EX3U1zpPiD_5Ewv7KVgac0rfClO3I1-GIObkW5AC-Po_teZaIdH9GEy72AnO8LKKkHKBQSYOxic0_FyEn_1Oa_U59dEewX-EvBGA7egTp_kOaQfp257VIErxL9ZvVW8NSL5xjCWLYPptNoVs89TylpMgZyN-RQ_4IwO_5XRrm0DLliaemuFIOOYWaYcGzuGDSnPvPEJivlKwkfoukFbLLb5u2PfpCmUNaBk5aDXzHhdSSmhbUPkU_uXnmEW-VTaLRgJNXYtdkSqMtGLVF_E0FKHIJ3AMSNwEwkQl_Z0sWwRj5CLm2LzYlEkT1gQ6-HRfCCqym304YLRrxe5FYsJ8ZMHqsH1a7JzgBSX9FOokvtwBhObH1iA3VCmVVVFDSoKBD6H_a46dAV7r9UePX8HW7voOlkaQ5rUirNsrWgzW_XBMlvRL4RJW1OUKTWwMRuM-aqPwIZIOBGm3LavtFojWvMttBI5qGL6xRuWlHIONy2S902CbnLO7499dInQJfkcGQ2mRc6m1yPbTMNMack38-Y3Oz2dWLr9mqCB-fAJe9MUDJqhDoJOQBEwnJMc_Z7E.5ekiDPragR2HnIJsIPyCFQ";

const id="12795";

const phone="7382271170";
const moduleName="pharmacy";


export default function App() {
  return  <SafeAreaView style={{flex: 1}}>
      <Button
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
    />
      
  <VisitHealthView
    baseUrl = {visitBaseUrl}
    token = {token}
    id = {id}
    phone = {phone}
    moduleName={moduleName}
    magicLink={"https://star-health.getvisitapp.xyz/?mluib7c=87ddd35a"}
  />
  </SafeAreaView>
  

}