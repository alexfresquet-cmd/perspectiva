import React, {useEffect,useMemo,useState} from 'react';
import {ActivityIndicator,FlatList,Linking,RefreshControl,SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,TextInput,TouchableOpacity,View} from 'react-native';

// Datos editables desde este mismo chat. No se envía ninguna información personal.
const FEED='https://raw.githubusercontent.com/alexfresquet-cmd/perspectiva/main/docs/data/edicion.json';
const COLORS={bg:'#F7F5EF',card:'#FFFDF9',ink:'#172525',green:'#286559',muted:'#687771',border:'#DFE4DE'};
const GROUPS=[
 {name:'Todas',cats:[]},
 {name:'Mundo',cats:['Mundo','España y Europa','Geopolítica']},
 {name:'Local',cats:[]},
 {name:'Economía',cats:['Economía']},
 {name:'Ciencia y tecnología',cats:['Ciencia','Tecnología','Salud','Medioambiente']},
 {name:'Sociedad',cats:['Sociedad','Cultura']},
 {name:'Positivas',cats:['Noticias positivas']},
];
const colorFor=(cat)=>({
 'Mundo':'#2E6A68','España y Europa':'#666B99','Geopolítica':'#606E64',
 'Ciencia':'#3F7590','Tecnología':'#6F648D','Medioambiente':'#648B54',
 'Noticias positivas':'#73944B','Economía':'#98764F','Sociedad':'#A66A61',
 'Cultura':'#A77F59','Salud':'#668B7B','Local':'#8A663E'
}[cat]||COLORS.green);
const validLink=(url)=>typeof url==='string'&&/^https:\/\//i.test(url);
const touch=(fn)=>({onPress:fn,activeOpacity:0.78});
function Section({title,children}){return <View style={{marginTop:21}}><Text style={s.section}>{title}</Text>{children}</View>}
function Button({label,onPress,primary=false}){return <TouchableOpacity {...touch(onPress)} style={[s.button,primary&&s.primary]}><Text style={[s.buttonText,primary&&{color:'white'}]}>{label}</Text></TouchableOpacity>}
function Story({news,onPress,feature=false}){return <TouchableOpacity {...touch(onPress)} style={[s.story,feature&&s.feature]}>
 {feature&&<View style={[s.art,{backgroundColor:colorFor(news.categoria)}]}><Text style={{fontSize:67,color:'#F7F5EF'}}>✦</Text><Text style={s.artLabel}>{news.categoria}</Text></View>}
 <View style={{padding:feature?19:16}}>
 <Text style={[s.small,{color:colorFor(news.categoria)}]}>{news.categoria.toUpperCase()}  ·  {news.fuentes?.length||0} {(news.fuentes?.length||0)===1?'FUENTE':'FUENTES'}</Text>
 <Text style={[s.title,feature&&{fontSize:29,lineHeight:34}]}>{news.titulo}</Text>
 <Text style={s.desc}>{news.entradilla}</Text><Text style={s.read}>Leer explicación y fuentes  →</Text>
 </View></TouchableOpacity>}
export default function App(){
 const [edition,setEdition]=useState(null);
 const [loading,setLoading]=useState(true);
 const [err,setErr]=useState('');
 const [category,setCategory]=useState('Todas');
 const [localScope,setLocalScope]=useState('Todas');
 const [view,setView]=useState('home');
 const [selected,setSelected]=useState(null);
 const [query,setQuery]=useState('');
 const [favorites,setFavorites]=useState([]);
 const [savedOnly,setSavedOnly]=useState(false);
 async function reload(){
  setLoading(true);setErr('');
  try{
   const response=await fetch(FEED+'?v='+Date.now());
   if(!response.ok)throw Error('HTTP '+response.status);
   const data=await response.json();
   if(data.schema_version!==1||!Array.isArray(data.noticias))throw Error('Formato desconocido');
   setEdition(data);
  }catch(e){setErr('No se pudo descargar la edición. Comprueba tu conexión e inténtalo de nuevo.');}
  finally{setLoading(false);}
 }
 useEffect(()=>{reload()},[]);
 const news=(edition?.noticias||[]).filter(n=>n.categoria!=='Deportes');
 const positive=news.filter(n=>n.categoria==='Noticias positivas');
 const localNews=(edition?.noticias_locales||[]).filter(n=>n.categoria==='Local');
 const localScopes=['Todas','Sant Andreu','Barcelona','Catalunya','España'];
 const scopedLocal=localNews.filter(n=>(localScope==='Todas'||n.ambito_local===localScope)&&(!query||[n.titulo,n.entradilla,n.region,n.ambito_local,n.tema_local].join(' ').toLowerCase().includes(query.toLowerCase())));
 const localPriority=['Sant Andreu','Barcelona','Catalunya','España'];
 const featured=[...news].filter(n=>n.portada).sort((a,b)=>(a.posicion_portada||99)-(b.posicion_portada||99)).slice(0,3);
 const filtered=useMemo(()=>{
  const cats=GROUPS.find(g=>g.name===category)?.cats||[];
  const source=category==='Local'?localNews:news;
  return source.filter(n=>(category==='Local'||!cats.length||cats.includes(n.categoria))&&(!savedOnly||favorites.includes(n.id))&&(!query||[n.titulo,n.entradilla,n.categoria,n.region,n.ambito_local,n.tema_local].join(' ').toLowerCase().includes(query.toLowerCase())));
 },[edition,category,query,savedOnly,favorites]);
 const open=(n)=>{setSelected(n);setView('detail')};
 const back=()=>{setView('home');setSelected(null)};
 const link=async(url)=>{if(validLink(url)&&await Linking.canOpenURL(url))Linking.openURL(url)};
 const toggle=()=>setFavorites(ids=>ids.includes(selected?.id)?ids.filter(x=>x!==selected.id):[...ids,selected.id]);
 return <SafeAreaView style={s.safe}><StatusBar barStyle="dark-content" backgroundColor={COLORS.bg}/>
  <View style={s.header}><TouchableOpacity {...touch(back)} style={s.brand}><Text style={s.logo}>P</Text><View><Text style={s.brandName}>Perspectiva</Text><Text style={s.tagline}>EL MUNDO, CON CONTEXTO</Text></View></TouchableOpacity>
  <TouchableOpacity {...touch(reload)} style={s.refresh}><Text style={{color:COLORS.green,fontWeight:'800'}}>{loading?'…':'↻'}</Text></TouchableOpacity></View>
  {view==='detail'&&selected?
    <ScrollView contentContainerStyle={s.body}><TouchableOpacity {...touch(back)}><Text style={s.back}>← Volver a las noticias</Text></TouchableOpacity>
    <Text style={[s.small,{color:colorFor(selected.categoria),marginTop:23}]}>{selected.ambito_local?('LOCAL · '+selected.ambito_local.toUpperCase()):selected.categoria.toUpperCase()}  ·  {selected.fecha||''}</Text>
    <Text style={s.detailTitle}>{selected.titulo}</Text><Text style={s.lede}>{selected.entradilla}</Text>
    <Button label={favorites.includes(selected.id)?'♥ Guardada':'♡ Guardar noticia'} onPress={toggle}/>
    <Section title="Qué ha pasado"><Text style={s.paragraph}>{selected.que_ha_pasado}</Text></Section>
    <Section title="Contexto"><Text style={s.paragraph}>{selected.contexto}</Text></Section>
    <Section title="Por qué importa"><Text style={s.paragraph}>{selected.por_que_importa}</Text></Section>
    {!!selected.que_se_sabe?.length&&<Section title="Qué sabemos">{selected.que_se_sabe.map((t,i)=><Text style={s.bullet} key={i}>•  {t}</Text>)}</Section>}
    {!!selected.que_falta?.length&&<Section title="Qué falta por confirmar">{selected.que_falta.map((t,i)=><Text style={s.bullet} key={i}>•  {t}</Text>)}</Section>}
    <Section title={'Fuentes originales ('+(selected.fuentes?.length||0)+')'}>
     {(selected.fuentes||[]).map((f,i)=><TouchableOpacity {...touch(()=>link(f.url))} key={i} style={s.source}>
      <Text style={[s.small,{color:COLORS.green}]}>{f.medio?.toUpperCase()} · {f.pais||''}</Text>
      <Text style={s.sourceTitle}>{f.titular}</Text>
      {!!f.extracto&&<Text style={s.paragraph}>{f.extracto}</Text>}
      {!!f.orientacion?.etiqueta&&<Text style={s.sourceNote}>Orientación documentada: {f.orientacion.etiqueta} ({f.orientacion.proveedor})</Text>}
      <Text style={s.read}>Abrir artículo original  ↗</Text>
     </TouchableOpacity>)}
    </Section>
    {!!selected.analisis_verificado&&selected.comparacion&&<Section title="Comparación de coberturas">
      <Text style={s.paragraph}>{selected.comparacion.resumen||''}</Text>
      {(selected.comparacion.coincidencias||[]).map((x,i)=><Text key={'c'+i} style={s.bullet}>• {x}</Text>)}
      {(selected.comparacion.diferencias||[]).map((x,i)=><Text key={'d'+i} style={s.bullet}>• {typeof x==='string'?x:JSON.stringify(x)}</Text>)}
      {(selected.comparacion.limites||[]).map((x,i)=><Text key={'l'+i} style={s.sourceNote}>{x}</Text>)}
    </Section>}
    <Text style={s.foot}>Perspectiva · Información y enlaces para contrastar la noticia.</Text></ScrollView>:
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={s.body} refreshControl={<RefreshControl refreshing={loading} onRefresh={reload}/>}>
      <Text style={s.small}>EDICIÓN {edition?.fecha_edicion||'NO DISPONIBLE'}</Text>
      <Text style={s.headline}>Tu mirada al mundo.</Text>
      {!!err&&<View style={s.alert}><Text style={s.paragraph}>{err}</Text><Button label="Reintentar" onPress={reload}/></View>}
      {edition&&<>
       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.pills}>
       {GROUPS.map(g=><TouchableOpacity {...touch(()=>{setCategory(g.name);setSavedOnly(false)})} key={g.name} style={[s.pill,category===g.name&&!savedOnly&&s.pillActive]}><Text style={[s.pillText,category===g.name&&!savedOnly&&{color:'white'}]}>{g.name}</Text></TouchableOpacity>)}
       <TouchableOpacity {...touch(()=>setSavedOnly(!savedOnly))} style={[s.pill,savedOnly&&s.pillActive]}><Text style={[s.pillText,savedOnly&&{color:'white'}]}>♡ Guardadas</Text></TouchableOpacity>
       </ScrollView>
       <TextInput value={query} onChangeText={setQuery} placeholder="Buscar noticias…" placeholderTextColor="#7B8983" style={s.search}/>
       {category==='Todas'&&!query&&!savedOnly?
        <>
         <Section title="En portada">{featured.length>0&&<Story news={featured[0]} onPress={()=>open(featured[0])} feature/>}
          {featured.slice(1).map(n=><Story key={n.id} news={n} onPress={()=>open(n)}/>)}</Section>
         <Section title="Más actualidad">{news.filter(n=>!featured.includes(n)&&n.categoria!=='Noticias positivas').map(n=><Story key={n.id} news={n} onPress={()=>open(n)}/>)}</Section>
         <Section title={'Noticias positivas · '+positive.length}>{positive.map(n=><Story key={n.id} news={n} onPress={()=>open(n)}/>)}</Section>
        </>:
        category==='Local'&&!savedOnly?
        <>
         <Text style={[s.paragraph,{marginTop:6,marginBottom:12}]}>Noticias próximas, separadas de la edición internacional. Damos prioridad al distrito de Sant Andreu sin incluir noticias de otros municipios con el mismo nombre.</Text>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.pills}>
          {localScopes.map(scope=><TouchableOpacity {...touch(()=>setLocalScope(scope))} key={scope} style={[s.pill,localScope===scope&&s.pillActive]}><Text style={[s.pillText,localScope===scope&&{color:'white'}]}>{scope}</Text></TouchableOpacity>)}
         </ScrollView>
         {localScope==='Todas'?localPriority.map(scope=>{
          const items=scopedLocal.filter(n=>n.ambito_local===scope).sort((a,b)=>(b.fecha||'').localeCompare(a.fecha||''));
          return <Section key={scope} title={scope+' · '+items.length}>{items.length?items.map(n=><Story key={n.id} news={n} onPress={()=>open(n)}/>):<Text style={s.paragraph}>Sin noticias recientes verificadas para esta zona.</Text>}</Section>
         }):<Section title={localScope+' · '+scopedLocal.length}>{scopedLocal.length?scopedLocal.map(n=><Story key={n.id} news={n} onPress={()=>open(n)}/>):<Text style={s.paragraph}>No hay noticias recientes verificadas en esta selección.</Text>}</Section>}
         <Text style={s.foot}>La edición local se prepara manualmente y no sustituye a las alertas oficiales en tiempo real.</Text>
        </>:
        <Section title={savedOnly?'Guardadas':category}>{filtered.length?filtered.map(n=><Story key={n.id} news={n} onPress={()=>open(n)}/>):<Text style={s.paragraph}>No hay noticias en esta selección.</Text>}</Section>}
       <Text style={s.foot}>Edición seleccionada y actualizada desde Perspectiva. Los artículos originales pertenecen a sus respectivos medios.</Text>
      </>}
    </ScrollView>}
 </SafeAreaView>
}
const s=StyleSheet.create({
 safe:{flex:1,backgroundColor:COLORS.bg},header:{height:70,borderBottomWidth:1,borderBottomColor:COLORS.border,paddingHorizontal:17,alignItems:'center',justifyContent:'space-between',flexDirection:'row'},
 brand:{alignItems:'center',flexDirection:'row'},logo:{height:39,width:39,overflow:'hidden',backgroundColor:COLORS.ink,color:'white',textAlign:'center',fontFamily:'serif',fontSize:28,borderRadius:10,marginRight:10},
 brandName:{fontFamily:'serif',fontSize:24,color:COLORS.ink,fontWeight:'700'},tagline:{fontSize:9,color:COLORS.muted,letterSpacing:1},
 refresh:{padding:12},body:{padding:18,paddingBottom:65},small:{fontSize:11,fontWeight:'800',letterSpacing:.7,color:COLORS.muted},
 headline:{fontFamily:'serif',fontSize:33,color:COLORS.ink,marginTop:7,marginBottom:10},
 pills:{flexGrow:0,marginVertical:12},pill:{paddingHorizontal:15,paddingVertical:10,borderWidth:1,borderColor:COLORS.border,borderRadius:23,marginRight:8},pillActive:{backgroundColor:COLORS.ink},
 pillText:{fontSize:12,fontWeight:'700',color:COLORS.ink},
 search:{paddingHorizontal:15,paddingVertical:11,borderRadius:12,borderWidth:1,borderColor:COLORS.border,backgroundColor:'white',marginTop:3},
 section:{fontFamily:'serif',fontSize:26,color:COLORS.ink,marginBottom:14},
 story:{backgroundColor:COLORS.card,borderRadius:15,borderWidth:1,borderColor:COLORS.border,overflow:'hidden',marginBottom:12},
 feature:{borderRadius:18},art:{height:170,justifyContent:'center',alignItems:'center'},artLabel:{position:'absolute',left:14,top:13,color:'white',fontSize:12,fontWeight:'800'},
 title:{fontFamily:'serif',fontSize:22,lineHeight:28,color:COLORS.ink,marginTop:8,marginBottom:9},
 desc:{fontSize:13,lineHeight:20,color:COLORS.muted},read:{fontSize:12,fontWeight:'800',color:COLORS.green,marginTop:13},
 back:{color:COLORS.green,fontSize:13,fontWeight:'800'},detailTitle:{fontFamily:'serif',fontSize:32,lineHeight:39,color:COLORS.ink,marginVertical:12},
 lede:{fontSize:17,lineHeight:27,color:'#3B4B46',marginBottom:15},
 paragraph:{fontSize:14,lineHeight:23,color:'#40544C'},bullet:{fontSize:14,lineHeight:23,color:'#40544C',marginBottom:7},
 button:{borderWidth:1,borderColor:COLORS.green,borderRadius:30,paddingVertical:11,paddingHorizontal:16,alignSelf:'flex-start',marginTop:13},
 primary:{backgroundColor:COLORS.green},buttonText:{fontWeight:'800',color:COLORS.green},
 source:{backgroundColor:COLORS.card,borderRadius:13,borderWidth:1,borderColor:COLORS.border,padding:15,marginBottom:11},
 sourceTitle:{fontFamily:'serif',fontSize:19,lineHeight:25,color:COLORS.ink,marginVertical:8},
 sourceNote:{fontSize:12,lineHeight:18,color:COLORS.muted,marginTop:7},
 alert:{padding:12,borderRadius:12,backgroundColor:'#F8EBDC'},foot:{fontSize:11,color:COLORS.muted,textAlign:'center',marginVertical:25}
});