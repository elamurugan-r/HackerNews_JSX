import './style.css';
import Anchor from '../../atoms/anchor/Anchor';
import { useAxios } from '../../customhooks/UseAxios';

export default function Item(props) {
    const [data] = useAxios('item', props.id, {});

    const getSite = (url) => {
        return url?.replace('http://www.', '').replace('http://').replace('https://www.').replace('https://').split('/')[0];
    }

    const getTime = (ms) => {
        let now = new Date();
        let actualDate = new Date(ms*1000);
        let diffTime = now.getTime()-actualDate.getTime();
        let secs = Math.floor(diffTime/1000);
        let mins = Math.floor(secs/60);
        let days = Math.floor(mins/24);
        let years = Math.floor(days/365);
        if(years){
            return years+' years ago';
        } else if(days) {
            return days+' days ago';
        } else if(mins) {
            return mins+' mins ago';
        } else {
            return secs+' seconds ago';
        }
    }

    
    return(
        <>
            <tr className="athing" id={props.id}>
                <td align="right" valign="top" className="title"><span className="rank">{props.sno+1}.</span></td>
                <td valign="top" className="votelinks">
                    <center>
                        <Anchor id="up_27760931" url={`vote?id=${props.id}&amp;how=up&amp;goto=new`}>
                            <div className="votearrow" title="upvote" ></div>
                        </Anchor>
                    </center>
                </td>
                <td className="title">
                    <Anchor 
                        url={data?.url}
                        className="storylink"
                        rel="nofollow"
                    >
                        {data?.title}
                    </Anchor>
                    <span className="sitebit comhead">
                        &nbsp;
                        (
                            <Anchor url={`from?site=${getSite(data?.url)}`}>
                                {getSite(data?.url)}
                            </Anchor>
                        )
                    </span>
                </td>
            </tr>
            <tr>
                <td colSpan="2"></td>
                <td className="subtext">
                    <span className="score" id={`score_${props.id}`}>{data?.score} point</span>
                    &nbsp;by&nbsp;_
                    <Anchor url="user?id=amrrs" className="hnuser">{data?.by}</Anchor>
                    &nbsp;
                    <span className="age" title={`${new Date(data?.time*1000)}`}>
                        <Anchor url={`item?id=${props.id}`}>
                            {getTime(data?.time)}
                        </Anchor>
                    </span>
                    <span id={`unv_${props.id}`}></span>
                    &nbsp;|&nbsp;
                    <Anchor url={`hide?id=${props.id}&amp;goto=new`}>hide</Anchor>
                    &nbsp;|&nbsp;
                    <Anchor url={data?.url} className="hnpast">past</Anchor>
                    &nbsp;|&nbsp;
                    <Anchor url={`item?id=${props.id}`}>discuss</Anchor>
                </td>
            </tr>
            <tr className="spacer"></tr>
        </>
    )
}