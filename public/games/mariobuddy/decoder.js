// Decoder script for mariobuddy/script.js
// This will decode the compressed JavaScript and extract all readable text

const fs = require('fs');

// Read the original script
const scriptContent = `eval(
  Function(
    "[M='HOEQZcMs~rWm\`xvREoo@_ug^Yx?|TviU_nwXYU_DBzB_Lga\`D_QVJdyniyFOurztr?gK|XPOcEZA~l?]cg_RmpmO_|yecS}Lf~@V[ymC][Q}ErWJg^lML?^nmcnVd_?nunnxXclTvwSrZgA~]@PtdV@[|LD@[rF_elrsVjIrrUlk[k^~gwq{i}KY~UFBMnMSQft|Jy?_eLYH]qHbu}UP|pMyHIQHuUSG~tKwqGYTa[ENt_gYVIjEXRvqNRgF{KLtHr]XqgIb|O^zjNaV_\`jrjMi_MicrQjx[]rZ?dbX{K_Hy@K@igPLYHFIplgyuuBFEUMqwvcon~qPX}X\`hccIt{BC[m|hOFpZzm}EBn\`~YyAftDG~Kqv@[xyQQbHWFZ|R]Y@fmgj[kdrN}aISsezq\`aCpJR|tpBRyyFag}DoNVKzO@yowwyWGP]S_kfiH~\`z_YKFM^FbNFrVRQBD@e}qS?{ZgbSCVU}OHIFtsQ{GUw\`}SWOBiJ_lzDDCVbhbILk]{~DYN]iwz?YmLgMVh[}bKRI?BPdBX[FzF@Lc[ClEfX^tMzVrpbeD_feLpNalnVm~o~^WSVU_ntVP?pUSwTq^{Qb^h_\`pmdq}eQfPe]hi]MY}{qVNfZQt}}n@S@AxnpY~PoJ\`zduPtkgL{xHtD~fR|f}fWB^kT{nXsNpFzdGc^IFVx[uA^DiHsR~yvn_w_hVapiXZnm|nx{}E@gkdzY^h}b~eahM{dYvtvst{^FhGm^OFKqK|p{WocUABzwTFYoahijwZKsr@IN{Cs\`^XE_^{qQQk^KnGlG]vw^@}SE]BA@L[c~FhLuG|orVLlXeN]DKgNMlsdIfqtlirB^TK{GG~yKBr|QTEO^udqWI?|CPz|P@KkGR{Lfxebg{EjXrHy\`RKVNA@RwYNgSyK[AyKEgNn@TkTYAzt|GMluRlIujDHn\`cw|SS_JXIUTUgyoINazfKhwvDllnKAlZQvT@s|PJuQhfy|RWI^ZujLrv{?}liKMPhYBwOBH|z}YQABq][EhHpPbugYXr[ezRAPavZIsqc_oaYCSOmWsxKjmi]cQxrNZoufpQHuQfJwxemOT@kCfOYSXPy]edgp^eCxrw[p[tsG\`SjAYY]DCpvAfCZfwthRF\`pUImrxDZkprhtY\`YBqjRR?aPVy}YCs\`OBqn@uZYGoK_u\`@zJ{h]dWY_J\`SsLW@nL{PxYzg~|hrgSbhpFkng}SrdmhyvWgWW]ggyzRKByWIhKxtVCtHWnchVInbqOTOTt\`dyHVOWSX@RxGfH?kbl\`~lVvKbISc\`]O]jalvnLEbFZfdfCK^YWI|SfY|OH~@LlSbN?\`RYcT||~dWptlL?xJ[[IZLJEVmd]^ZfI?DOxqICUO|beOJcIXzFsqUVi?zHeGpoo{v@pdJkjDNNjNYv^yjzJOZsDJHpOFRrvLtapgg?~gK}Y{b@przzZb[~YA}jymJ^YE?a[w{caY~PqBvEKFR^C^FBqK_tUbcYLGhhcYxcxy}gJaP^EtmX~sGIcAE{f{xId_?vPXN}L^QwnkSuWne~tdgKVK@zHmuh{hMmCKQbvNqLVtamxtFMYJAVoshk_{P~_]TZ^KeUbf\`NHrloQjcybQCcTMCYLN||L{W]q_ncIEQONfOIUMDuHfwATYmtPHfss@AaPrH?D?|dFs}J}}f~|eZ?whFSVzeyVAl[}ZAaPwW|]NFBUZUeoUa^OpkwjA@sPYliKocozXhoCvpNgFwOnSzbhcUCUsgGJgqX~W[Vw@SRFTtdCbaf[dzatyz[l@uclaUWiW\`YibIvdm]MOmAK]lOd]t[P^NbPEfXYaWh\`VSH|ptsHmTXwnsLu@aFChyqnvlT?d{|IdKFF[uMnUU}AYNXKY\`^]|K]}MK\`|@J~XSJShx}Z{hLQRairofalYEyjqe^oR{n?uFpeAcehsL]zWr|OmtniRLtDlb\`ZSE@zaUidRC[G?qBOWzfZw}jwIQtDUx_jQsEFEfPGsH|olTE^]bLUvRGv\`by}^{tV@wewNjYKGfo\`bIzOQA\`iMb~^QpaGQpbk~otRPYq~@CKbGLPOvw[TGjpKVvNKxHT_vIBbVjnzj}EFzH{bE[XcYbSc[XT]GPtgHdYiT~YivmG|XrwzF[uRh[AmIH\`RAfGPWqakFotPSca|hNIdm@TNo@IY]lwxgvN]KP]PDWnzbGs~v@sYAte^gg]H{Wf_}sX|ldG]c^Ni^zf\`^kFSJ}_Aj\`dXDSj?IEzFiX~QdA{^jqTuLWwyz_vhnu{~_B_JEWzRArJ}@SoNC^qkbH\`PK~wtFdjOwFHbZl^sCyeTanVLU\`a?m~MQgRezPbjRgNAyGzz[eKMCsF^BIMmyKPH?tjHWwI}s[Bep}^oEOrCRMXUoKZMibUtsWcDAlCYh}X}?jWC}MNXbaE}a|RNVrkyQ}D_BBSBbJ{R?fSQser{vhAkzlSKvsaemFnwKVVOmImkYhHX|zbuqV|jNOBoOz\`KXzDYYOGF|Dhx]nKgYR[elU\`Ic\`R{EMuqCaPTJiZptJzQ}QZpHv~Sdkx_b~uuLfWMw?GDmFyqLI?uExZM|YtUmq?\`EOLNrTxy\`mXyhmuWNVGeQG[I@B{Op?vnqwEoaa]|NIRcMQCLp|MfRUkKMLSgryD]eGwKH_KVbgl@sUh@F^P_isMxh[xTU^\\`\\`pvNsU{qNCrEy?NGF[nMPN]WFG}pMc?Wl]MgCSCJF^Q?UF^\`CfHWvRKcQ]OaolDF@MZ[z^ocb]EtwNtxWbHSZQ}JRJGPS\`}tuUhXYNtW~]GWhZIipipv~Etgy}FapMbfihExjN[FK[pRipKrfMVm}@IF@w_HnQyOWNSRSYIzw\`MeEIH~g{q\`QEAfp}jHqVJCkhGBcNIi|fIGkBqekP]W}tM~Rk}\`TuwEWW\`ESOQQzL\`Ft}YV{^^m[Py?eZ{WtJMcMSnGud}R]nC~QbH\`ueF|uOUSjQlZXDRZHfXC~bJrcTCu|GzJBDFB@wr?[xHIJuEPUfN_y{sxP}c[yBoXlm_^I^v\`DCEzoj^Pdk|[TuD\`DIKDqWqIAbCnV^ahSEAkcYa~@cgj^GO^OqN^?FTjHN?d\`}av}Q]WDDArg@aykW@oHNSq]IdqLRALWPaJ?iYVHMzwzJYS|^sRMAhmDxvPoMdRwTid{brjnba_Q^}JQUJV~\`[soZSfKDxWxT|@mDbh@kxDlFyfs^~kb}}PuZngyYrufReGl^wXk_hJIXhPOKmcdQk]gFaBmGkrbpEmz]R^X~ceaZoFoe?UbbFLBrUnTlyWYVxzZYf]Jtg}X|RyC^@XscRmx\`vnOOnmGld^Ql|Tm@QTCaxuD\`w_puZT\`IZGf}ceLh@w^CVS^vrLj}tWFs{IitpNYI}g?bMEhiT|lYgorPJ[^nEaIm_XISQLG{Xr^~[[Z@xK@Stcg|t@\`dwIbQ{ZB\`x}R]MIhp[DYm@Z?J^L@Tyrl{MmMVWGHVESL[E~cgIPgMgfOdjRVwJpT@u{hf^Y?nyqYZ]sACl^KyKnvd^PwekQEwAIz}wax_@Qk}{UN^tJ|GkhQDfuBOwoxwmgxcM^e_v^joNOFM[\`_iRVCKDCvLYiwjauJMvNTpdEBVC?kkoIaDhfbRPNdLsdiF[su^Vi{?zEUB@hLgkPHvChPUzaZPu{vchdT^SS~BPy_pTyTPIV{nZxmBRplKsLlME|LIxlq@TLh}nCIF~HKp|FWI[vLiQVf?HfXOWGfLtVJ@BeMU[?hCvaYfz@lPXlgRA_YWLz?yEm\`SlBDsQ|WpbCOph}YRcDNL~pxQ{hbkyYEKh?oFVAXGsnp[nrw[I@FP^a}dYpAaXaUV]vWKK[SJ@jbn?SJ?Nk[sRrfKGubo~CFNlaFXmfOVmfRb\`HArUt?}QWLUlBzV~WGAUMIGHH}tonAOrDgWnVxTwybK@hIqfgfpI_}rI]{UuCRCv\`@nh[suEg?h|ZhgCMt^lFXzIVdF@emy_u?AnrdeHIb|h?[OuYKY?UhBx\`EiMnMynrLs|?^~xnMlOrXlidBaEDxyFCf}?}Wcc_G|gfD_H?gPbcfng_AGr~]xnhtWuXiUgPfrwwzj~F?Rj{Yj@z|s@Xa}CRvq{UPKgegmGLdfjE~bRgCMyN}OLzq_ypywMWyKd_PG_mFBbJFJ^PGk[vSiPyA[loTh~{]mRrw^JdgsHOZ_jWnqgoaNbnSR^sZA}QqKZyqhIVvmmCdmiVn}WYnOGC\`EXeCcJ~v}r~AkFs\`|LHUvqP@s~oCmevjzZEr_cAsg^rL_aucoCCTSSMf~N_rQQjBHmwJDXj|UHPVDvhHhApxMC}|WRcrDYZlgyUiQVG?NKwEemT}ys?gee|uy~ZPG_[WEi_I}rVZpRlqfra@IK~lrwcpl|AfdtAxZQV~T~HN@sFGE~Fe?BsmvqpYkzP?GR|_WdkgThnXotiJ{O{}JItIhpcEjvaue?LlIezSdY}arzh@p]R\`O{HSnnUMnBw}lU[P|^hsa@O_HY~FzM@f\`cgsFw?WZ?gequbaKIjtzq|aqKhHGepMfLGJHVmDXNNNj[fua{SVp|yM^]E{}a?Ih]{KZYomEWWnGi_\`tbAMVo_QPjINHbyh_\`]CO\`?b|_A[WyOKyv_cwvfrtnWgTnPGb~MPbkY?SVqSbQqvTkypy\`~baAksNGag^j{OzkVxhbRmlCwBYqe}DHlOYe]dYDeI\`nseLEVUlGdR]Co}y|un{@PqL[Z\`Dtlo}qx}Um\`[LgJq_[ddxY~cY~eRfPFOQjZZIlHkCW^RTNVbaEy|icphSrGHk|[eAUJkOfTxcnVsQtrkMT~}b|XSswNM]hmCnjNev{f~GTeWc\`]fMI[LYWU@uJdAxgvhzHSXR|{WB~?[o^@F^fGBqhp\`GwDGMyNCzkij|NUQWgMy?txoHATGxXSUD|ht|c[Q|OuYmeGVuSkJYnJvlkhdgWItS\`RdOCGCjn_xxkQlTZzVG?MoyzVTmvhz@Zc|kNPYltqwIHtoXqOdmcoj^GUrvd\`UvR}]HmbZdNff[HH\`]qXAY[DQoaniiLW{zleGTbygtayr\`etJj^LhbuKYW~bBOz@bI[YtzLA_BNEmEaWRDCTdC~?Z\`kbaerAzVgHkUBWuOrBv]OyDdNd?H^AOQ~sjXxfqn[tflotcTClsN{ggrRJb}@y[Dcix[]us?O_fIArm~{WVbix\`t\`g_GXIKdU]h[hKNs_yfHP_IsJjBKC^oPIV^YLA_YbvUyZ~pdPvKcaW[BaYLPqMjBNGebibSM}KIMfMaG]q^}_?s~V]mSPVL@VPSlP_NIjcUlFiMyQ\`pViMzphHUUm\`^OUo|kLATdqtbj[VNiDIz}gm^aFfh@HzP]GfJtgf@j?SFwBf@@|z|\`UO}I|?bBoZ{Xdgac|kCk@qa^biF|~~[QhaaF{neuQpS}]tbpZBs\`fA^HJQh{}yKmZ}zzYQr?razhrPFFOjiXMX?D|]Bndx]kvaHBKLqDXCNpjGi@zu}WPo@fuFj|_}bhRCOgi^]ehJlTCXzvelZPdzZw\`II{zAA~zpSaWfR@n\`Xh_s[saqTkzf[rE{fZrakc}?XxmegFHf~?fmP^ZMi[{lcXbn?cGTbbhbVm_~eGQgLC\`]_x^]P@cm|]OZxa_g[]SCwULwp}IEoyvVDQ?d|UK{\`oglheTZ~LPdQeGbHvpY~U_sd]IIh_|X[cVRdYPk^iNxnYtaqMPrhIUIZdWaalMmZqA{BzcR\`zDPT_?l_V]DGfQdXzUwDvBnJd]qWTueQk]M{Hpljrz]yjPMxC_VZ}z_NtP__trhhxbwOFgHocg@xWX@AKZThcuAI{\`JTUZos|@X^U@g]a@sk_ZaKMz\`fDODu?bNts^AFTL{dL|]RZdwYSCg|\`VxhQrI[ISOMGmcd[m|W?LxFAV?X|fEmmuSaVycdavbgrYTrpOy\`fg@HjKf^CvGkDAerWC?lIf{L|{OKaxNhQQDw_uvLmzbsu^hKUsrMhpoPKImPS\`ACuu]DEWAF|CPSUDv^KO}OLKD||cwf?^MhaCnXl?ll?@Nb}tRoXKxGJB~bTO^ksfpONxAiBD^bohYnmkyq@OewpcJDyW}Dug[dXQSmo{yCFZ?[U]QIq_c[a}Vj^kLO~CnU^ywuNoPAFWz?wtD]~e^}zZM?MqNowguwTpl\`{{?BpjAbHLJj]MF[|H{BOIJ\`UiHyXhzFrekIumu?RV^qtNDtAM^_Dmx\`]cGfUAG[OTYHLQ@D@TsK_SbpFs{nQpxOWFT|UMuPaUZ@ibslAKqFcfea\`PxvU{L\`hmJhW}NpxoonxIKGiok~MFb@^ZGnC|H_Sl~}ZutegjmayUmIG{krfPlREblJOUoFB_LJlxjXPa]D_j]WzxaPXC]nJOjsAk}c?WAenNsvHEYHQBaFufUlyRV\`k~YKCrqzwZ^xLXTxcX[kVkqh{T^\`Jhjjb[tdT|DzlZKWRa}kniYBpFe}\`VB_ZuIIE}^hp|ltaUFsNNkJ|Zq|[CxA{aIctT[m_WCeBAc}Qz\`^YL[QQr@NhGACC\`nRW{HUQDsQwc@A\`?eZYAo{zdyhd@CxPHSn]sYvPOA[|Uo_qSelAE\`Qrj~S[kvNq}szaDxO\`rLX}okI?oe}cR@KT?K^fiYQ[WS}yEVbZ_dxOr@ErBdI\`j|QPOA[LuIrB~|XYG~w]f{Y@aSPmFp}XXIvdzeaj[x}n}tQBleJ~ClDfjoVLVynUaqG_bnPIDBpt}UzM^^F_{MTGBRWK_?PHsqUG~NDrPfR\`|a\`gY~hXI\`][{C\`vy@cBQABbMcZ\`Mm~jzxNL?ZltF_FzhGJXiYnuO_NMHYnIEc}{{BqYWgbQnQFyWU@ce]SiVsOjXGOrx^UGk[yHv??F]FPcDDaMpvINhwBuRXzTCHbxosgBpuJMytXIrJjRZBZaSPy_k~VXvQZ{?Wbmbs_uM]xEuxSWr@jpypIgPqXwcfUnqkuT|@mzoVQxZMp~Uk~N|ShEAKu[QDiqhi}DSNYNv@sp?|?kA@JnqYWKzqDOnnFUqm{py[~B|tchV\`@XOEG?nzMp}gthKk^V~bIUzQ@vuUK}zkT]yoYJb?WOX}bx^@_^{FlW}ADl}vNQAZBvyU~^~g[^?i]mIuYLA@o^v}KiOSZFop@xexYJ]SwgMqc~k|\`~zTMDpFUajxuLsiwQg|idYZFWgP|jdMGBrIpZyu@pTVsQ^elpoFxF|NPRxdVPQXXJUiBLo|EqhJPdJYUuc|[YqU_KaRCmUhQgPe@K_E?Tl_CqFit?}GJzMKEDGxJr|^dcqQWYnjciovD|[]dGm{kyPWc@^OYRAqPDR|?|{ADgmoaDcTy|SHjN}PKAF\`y}VS[MEFOx{lXySAv?SMSnKmZAcrtd_V[PQJLRtWTC[aJiKOqdkibIhQj}xV}VdhGGEEIS[Op}CjkXiNv\`bYsJ?GRphwnzuHy?lb^QawZfvHnHH\`Ul?bNrxNVgLiIZKzb\`LxgGlfytCzycPAteiwLIKysGVzEEBuprKdt|sNQFZmhd{kZwdfENN[_^jIdm@{z^yXMG?YbtfTmo}STNEeqFR\`^WLG@DMF]oCyc[k}{izuWB@pcpkMtGhKS\`xVuZi@ZHsix\`rKpl]i|GSknSv@[|_Ihy|h{yl}b|[\`dAECSpz@O]Wa~U|Y~C@w}Kl^qML[OIDGYAeJkXV@\`KvoOiTbT@NiWr_XxMbQZDKiNxeF~AeqyjbFllmQGhDXbp]cSqteSZopD@EwZD{Siy|y{wab@YLvuJf\`w|oPoNH^p~y\`VtR_{LARK\`r\`jLEInjDseiZZOF|jmhe|KXo{^F[HxpLip\`sehuG^yo^rg}Galwgv]@xKS}qcIsiewT]SmVjptMCD[mOpF}Puf@_\`MsKETj\`fSEsMm{D_RTZ]CfrBFnLfUi^j_wVsK|UGqhqSPKsdBbImqR|rH[Pc_ZsWRmy}pdCX\`oPvjtvfFqbwzu@fXlP{FWSAsEcEKKlqQ{I[CctQVEiCwjM|ivh?e?_d[\`SE^n_BFDMkhAOlwQ~HwJX~tuffqoNSu|?UwztSk__GeSBo_NvxAZX|TPxKCVbUk^EMvyNZNvW{eB[VfMvTGYebX{Hw}RXaOKpqwHH?xmYgWJwZElLTcsMuK^s}wGhOEKH__AHC~^?yeRRePANt@eEvsoRmCuBS{}kalmNpROgwonKkWAx]plK|E^[_kXD^H[\`MMZ~uvKO?yGUC|gbW|zfviVhXCrr[}{qE]Fk^Bww{YaGJGoup\`AOG^|JxZdbbEVNThV{IVegsgBmS?Or}hWRRVq\`ze}]mcGfGMd\`gPOTLn_Sppy|XVc]VoJR{|S@cXIPIe?XEGMyxbW@EtE~{bLdVqWdpJLXrxFSgg^\`OAni}}WQo^hND?UU\`amR?OHaFhNEELSanafypnmwmH@mAib{P\`nZY^_IYv}~HCS[DrsZmOpYI}ighZHJiNRAf\`qfDnWmJIhxSisXPCa[GRXojT{Vc?s]~vKQf[S]qG@j{CRyittYAE|_}zMpcm]@v~xXKbxHvuIGT[LwYRrABPGseUfDg{?nrMK^bgpx|krfl_\`jqsox|bWHIIlRjk@cRmlgxcrfby\`XLhdOfIdUyuyk^Q]pv|F{aZuwVHX|~ze|ph?U]qxlD\`}{roXXmefAg^NVCCfFjihXf_hVbRKaIhLJ|[@lXyAp_NrSJhlGLVNajatQlRBzGzq{z\`YBbxMCLDzKymJRYAMaOS?EAsszi?t^Mnb{rCLD^H?e_{snuK?chF[YRpSO}ImPBnRmXlawFpCJAdXWtLFm@HNFbxHqbZfm|nvgm~FYv@jAbUSLa@pB\`Wz__vZCfY@iUOxB_Nv_LLT[}Y~}[dFiKYwnQTqcd[hL}]LoKcCYwCNXfPo@cXpxNGLEtMukE\`rTepV\`V?ooYIKMWOo{iPK?GQlUcyoW{IBAyHD[BFcpUbEB?TbBeIA?IjJTvbyfqzDBivxcm\`m|o|z@graztfXXyyWyjeVpbUycn|eQxSYttLHmNKfhP_KPjBVKp|[URaqUhxKmMYK@jUZ\`xdYO{bWzhvrBAxtH[ynKzvitYR|fsiI@e\`Ov~DlhfHrGNUKvJT[CF{i?vgc?XKcRZdtlNC]tywgxemGWt_fXr~t_h@evZ~f_ci_jcLu{@{gdqA@{Leh^\`yDgkflQzcvoV^aypyXgEkxGUBzf]c_UHm[JUvuAdUa[DpB}ozCEcrRHxPiVjEFDWtDtIwIOAPbl[kigZOCM]CwKBBzCwHx{KPQuazDgz}jgIcbRSnwG|\`SIMmojntEW_^_~KY@RkJoHdTJ@Yxdwd^lGT@djgYUJAcYiWpSBKzUQHEQTuqaCCuonw[ViQsGT[yUUH?neeNLiuD~Zr?bvsYrEGE\`ziHv^i_HnTzDRebxttx[i^ppec~^evQDSgXBH]zHdSNASSA?_J@yvo|]hkupMNnZ}R|Ms^eoBI\`]TH{}_}CH]'",
    ...']charCodeAtUinyxpf',
    "for(;e<19479;c[e++]=p-=128,A=A?p-A&&A:(p==34|p==39|p==96)&&p)for(p=1;p<128;y=f.map((n,x)=>(U=r[n]*2+1,U=Math.log(U/(h-U)),t-=a[x]*U,U/500)),t=~-h/(1+Math.exp(t))|1,i=o%h<t,o=o%h+(i?t:h-t)*(o>>17)-!i*t,f.map((n,x)=>(U=r[n]+=(i*h/2-r[n]<<13)/((C[n]+=C[n]<5)+1/20)>>13,a[x]+=y[x]*(i-t/h))),p=p*2+i)for(f='010202103203210431053105410642065206541'.split(t=0).map((n,x)=>(U=0,[...n].map((n,x)=>(U=U*997+(c[e-n]|0)|0)),h*32-1&U*997+p+!!A*129)*12+x);o<h*32;o=o*64|M.charCodeAt(d++)&63);for(C=String.fromCharCode(...c);r=/[\\0-\t-@Z^~]/.exec(C);)with(C.split(r))C=join(shift());return C"
  )(
    [],
    [],
    1 << 17,
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    new Uint16Array(51e6).fill(1 << 15),
    new Uint8Array(51e6),
    0,
    0,
    0,
    0
  )
);`;

try {
    // Execute the eval function to get the decompressed code
    console.log('Decompressing mariobuddy script.js...');
    const decompressedCode = eval(scriptContent);
    
    // Write the decompressed code to a file
    fs.writeFileSync('mariobuddy_decompressed.txt', decompressedCode, 'utf8');
    
    console.log('Decompressed code saved to mariobuddy_decompressed.txt');
    
    // Search for any "pico" references in the decompressed code
    const picoMatches = decompressedCode.match(/pico/gi);
    if (picoMatches) {
        console.log(`Found ${picoMatches.length} instances of "pico" in the decompressed code:`);
        
        // Get context around each "pico" occurrence
        const lines = decompressedCode.split('\n');
        let picoOccurrences = [];
        
        lines.forEach((line, index) => {
            if (line.toLowerCase().includes('pico')) {
                picoOccurrences.push(`Line ${index + 1}: ${line.trim()}`);
            }
        });
        
        console.log(picoOccurrences.join('\n'));
        
        // Save pico occurrences to a separate file
        fs.writeFileSync('mariobuddy_pico_references.txt', picoOccurrences.join('\n'), 'utf8');
        console.log('Pico references saved to mariobuddy_pico_references.txt');
    } else {
        console.log('No "pico" references found in the decompressed code.');
    }
    
    // Also search for other common game-related strings
    const gameStrings = ['title', 'name', 'author', 'credit', 'js13k', 'game', 'buddy'];
    gameStrings.forEach(str => {
        const matches = decompressedCode.match(new RegExp(str, 'gi'));
        if (matches) {
            console.log(`Found ${matches.length} instances of "${str}"`);
        }
    });
    
} catch (error) {
    console.error('Error decompressing script:', error);
}
