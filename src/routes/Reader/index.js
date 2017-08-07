import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from './Head';
import Content from './Content';
import Loading from './Loading';

class Search extends Component {
  constructor(props) {
    super(props);
    this.readNow = (id) => {
      this.props.dispatch({
        type: 'reader/getSource',
        query: { id },
      });
    };
    this.next = () => {
      this.goToChapter(this.props.currentChapter + 1);
    };
    this.prev = () => {
      this.goToChapter(this.props.currentChapter - 1);
    };
    this.goToChapter = (nextChapter) => {
      this.props.dispatch({
        type: 'reader/goToChapter',
        payload: { nextChapter },
      });
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'reader/getSource',
      query: this.props.match.params,
    });
  }
  render() {
    const { chapter = {}, detail = {}, logs = [], history } = this.props;
    return (<div style={{ background: '#FAF9DE', color: 'rgba(0, 0,0, 0.7)' }}>
      {
        chapter.title ? <div>
          <Head title={chapter.title} bookName={detail.title} history={history} />
          <Content content={chapter.body} />
          <div style={{ padding: 20, display: 'flex', justifyContent: 'space-around' }}>
            <a onClick={this.prev}>上一章</a>
            <a onClick={this.next}>下一章</a>
          </div>

        </div> : <Loading logs={logs} />
      }

    </div>);
  }
}

function mapStateToProps(state) {
  const { chapter, currentChapter = 0, detail } = state.reader;
  const { logs } = state.common;
  return {
    logs,
    chapter,
    detail,
    currentChapter,
  };
}

export default connect(mapStateToProps)(Search);
