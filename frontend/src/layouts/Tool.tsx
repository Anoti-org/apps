import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

  import "./Tool.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRef, type MutableRefObject, useState, useEffect } from "react";
import { animated, useSpring } from '@react-spring/web'
import { Progress } from "@/components/ui/progress";

type Resutls = Array<{ juristiction: string, date: string, summary: string, url: string }>

const risques = {
  UndeclaredWork: "Travail non déclaré",
  Corruption: "Corruption",
  Terrorism: "Terrorisme",
  Deforestation: "Déforestation",
  ChildrenWork: "Travail des enfants",
  ForcedWork: "Travail forcé",
  Pollution: "Pollution",
  Discrimination: "Discrimination",
  Remuneration: "Rémunération",
  AirEmission: "Émission d'air",
  SocialDialog: "Dialogue social",
  MoneyWash: "Blanchiment d'argent",
  WaterUse: "Utilisation de l'eau",
  HumanTraffic: "Traite des êtres humains",
  LaborLaw: "Droit du travail",
  SocialProtection: "Protection sociale",
  WorkTime: "Temps de travail",
  SafetyAtWork: "Sécurité au travail",
  ConflictsFinancing: "Financement des conflits",
  SecurityAgents: "Agents de sécurité",
  WaterRejection: "Rejet d'eau",
  LifeRights: "Droits de l'homme",
  PeopleMoving: "Déplacement des personnes",
  FreedomOfSpeech: "Liberté d'expression",
};

function extractWords(text: string, numberOfWords: number = 30) {
  return `${text.split(/\s+/).slice(0, numberOfWords).join(" ")}...`;
}


const analyze = (
  companyName: MutableRefObject<string>,
  risk: MutableRefObject<string>,
  setResults: React.Dispatch<React.SetStateAction<Resutls>>,
  setLoading: React.Dispatch<React.SetStateAction<'idle' | 'requesting' | 'analyzing' | 'noresults'>>,
) => {
  return async () => {
    if (!risk.current || !companyName.current) return;
    setLoading('requesting');
    const res = await fetch('https://api.anoti.io/jurisprudence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        companyName: companyName.current,
        risk: risk.current
      })
    }).then((response) => response.json());
    if(res === 'analyzing') { setLoading('analyzing'); return; }
    if(!res || !Array.isArray(res) || !res[0] || !res[0].analysis) {
      setResults([]);
      setLoading('noresults');
      return
    };
    const analysis = res[0].analysis;
    if(analysis.length < 1) {
      setResults([]);
      setLoading('noresults');
      return;
    }
    setLoading('idle');
    const results = analysis.map((result: any) => ({
      juristiction: result.jurisdiction,
      summary: result.summary || extractWords(result.text),
      date: result.decision_date,
      url: `https://www.courdecassation.fr/decision/${result.id}`
    }));
    setResults(results);
  }
}

function Loader(props: { loading: 'idle' | 'requesting' | 'analyzing' | 'noresults'}) {
  const { loading } = props;
  if(loading === 'idle') return <></>;
  if(loading === 'noresults') return <p className="w-full text-center text-sm p-8">Pas de résultats trouvé, l'entreprise est clean!</p>;

    const [progress, setProgress] = useState(10)
 
    useEffect(() => {
      setProgress(0);
      if (loading === 'requesting') {
        const timer = setTimeout(() => setProgress(99), 2000)
        return () => {
          clearTimeout(timer)
        }
      }

      if (loading === 'analyzing') {
        const timer1 = setTimeout(() => setProgress(33), 2000)
        const timer2 = setTimeout(() => setProgress(50), 10000)
        const timer3 = setTimeout(() => setProgress(70), 15000)
        const timer4 = setTimeout(() => setProgress(99), 25000)
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearTimeout(timer3);
          clearTimeout(timer4);
        }
      }
      return () => {};
    }, [loading])

  
  return <div className="w-full flex flex-col items-center justify-center p-8">
    <Progress value={progress} className="w-[50%] h-full h-[8px]" />
    {
      progress === 33 ? <p className="m-4 text-xs">On récupère les données de l'entreprise</p> : <></>
    }
    {
      progress === 50 ? <p className="m-4 text-xs">On cherche dans toutes les bases de données lié à l'entreprise</p> : <></>
    }
        {
      progress === 70 ? <p className="m-4 text-xs">On les analyze</p> : <></>
    }
    {
      progress === 99 ? <p className="m-4 text-xs">On filtres les documents</p> : <></>
    }
  </div>
}

export function Tool() {
  let risk: MutableRefObject<string> = useRef('');
  let companyName: MutableRefObject<string> = useRef('');
  const [testingTool, setTestingTool] = useState<boolean>(false);
  const [results, setResults] = useState<Resutls>([]);
  const [loading, setLoading] = useState<'idle' | 'requesting' | 'analyzing' | 'noresults'>('idle');
  const expand = useSpring({ maxHeight: results.length > 0 ? 700 : 400, config: { tension: 10, friction: 10 } });
  const openTool = useSpring({ maxHeight: testingTool ? 2000 : 0, padding: testingTool ? 8 : 0,  delay: 800, config: { tension: 10, friction: 10 } });
  const displayButtonTestTool = useSpring({ maxHeight: !testingTool ? 400 : 0, padding: !testingTool ? 8 : 0 });
  const analyzerFn = analyze(companyName, risk, setResults, setLoading);
  useEffect(() => {
    const ws = new WebSocket('ws://api.anoti.io/ws');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (risk.current !== data.risk || companyName.current !== data.companyName) return;
      analyzerFn();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <animated.div className="overflow-hidden text-center" style={ displayButtonTestTool }>
          <Button onClick={() => setTestingTool(true) }>Tester l'outil d'analyse de risque</Button>
      </animated.div>
      <animated.div style={openTool} className="w-9/12 p-8 overflow-hidden">
        <animated.div style={expand} className="rounded-md align-center bg-black tool-shadow animate-height overflow-auto">
          <div className="w-full flex justify-between my-4 px-8">
            <div className="w-full flex gap-4">
              <Input onChange={(event) => companyName.current = event.target.value} className="w-1/2" placeholder="Rentrez un nom d'entreprise"></Input>
              <Select onValueChange={(value) => risk.current = value}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sélcitionnez un risque" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                        <SelectLabel>Risques</SelectLabel>
                        {Object.entries(risques).map(([value, text]) => (
                          <SelectItem key={value} value={value}>
                            {text}
                          </SelectItem>
                        ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={analyzerFn} variant="outline"> Lancer l'analyse</Button>
          </div>
          <Loader loading={loading} />
          {results.length > 0 ? 
            <Table className="px-8">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Entreprise</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Résumé</TableHead>
                  <TableHead>Url</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{result.juristiction}</TableCell>
                    <TableCell>{result.date}</TableCell>
                    <TableCell>{result.summary}</TableCell>
                    <TableCell>{result.url}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> : <></>}
            {}
        </animated.div>
      </animated.div>
    </div>
  )
}

